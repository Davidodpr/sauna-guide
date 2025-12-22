#!/usr/bin/env node

/**
 * Fetch missing product images using Firecrawl
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

const FIRECRAWL_API_KEY = 'fc-bc24f10a07104dc9a7eb377a19ee8fad';
const OUTPUT_DIR = 'public/images/gear/products';

// Alternative URLs for failed products - try direct manufacturer sites
const PRODUCTS = {
  'higherdose-infrared-sauna-blanket': {
    name: 'HigherDOSE Infrared Sauna Blanket',
    urls: [
      'https://gethigherdose.com/products/infrared-sauna-blanket',
      'https://www.nordstrom.com/s/higherdose-infrared-sauna-blanket/5895855'
    ]
  },
  'huum-drop': {
    name: 'HUUM DROP',
    urls: [
      'https://www.amazon.com/HUUM-Electric-Heater-Stones-Stainless/dp/B08P5F6ZQT',
      'https://huumsauna.com/collections/all/products/huum-drop-heater'
    ]
  },
  'sweattent': {
    name: 'SweatTent',
    urls: [
      'https://sweattent.com/products/sweat-tent',
      'https://www.amazon.com/SweatTent-Portable-Sauna-Adults-Therapy/dp/B0C9MVDV2L'
    ]
  },
  'oura-ring-gen-3': {
    name: 'Oura Ring Gen 3',
    urls: [
      'https://ouraring.com/product/rings/heritage-gold',
      'https://www.amazon.com/Oura-Ring-Gen3-Heritage-Tracking/dp/B09LSQT27K'
    ]
  },
  'theragun-pro': {
    name: 'Theragun PRO',
    urls: [
      'https://www.therabody.com/us/en-us/theragun-pro-plus.html',
      'https://www.amazon.com/Therabody-Theragun-PRO-Black/dp/B08JPSNCP1'
    ]
  }
};

async function firecrawlScrape(url) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: url,
      formats: ['html'],
      onlyMainContent: false,
      waitFor: 3000
    });

    const req = https.request({
      hostname: 'api.firecrawl.dev',
      port: 443,
      path: '/v1/scrape',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Parse error'));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function extractImageUrls(html, baseUrl) {
  const images = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    let src = match[1];

    // Skip icons and tiny images
    if (src.includes('logo') || src.includes('icon') || src.includes('favicon')) continue;
    if (src.includes('1x1') || src.includes('pixel') || src.includes('sprite')) continue;
    if (src.includes('svg')) continue;

    // Make absolute URL
    if (src.startsWith('//')) {
      src = 'https:' + src;
    } else if (src.startsWith('/')) {
      const urlObj = new URL(baseUrl);
      src = urlObj.origin + src;
    }

    // Keep product-like images
    if (src.includes('product') || src.includes('cdn') || src.includes('shopify') ||
        src.includes('media-amazon') || src.includes('m.media') ||
        src.includes('cloudinary') || src.includes('imgix') ||
        (src.includes('.jpg') || src.includes('.png') || src.includes('.webp'))) {
      images.push(src);
    }
  }

  return [...new Set(images)]; // Remove duplicates
}

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const request = (targetUrl, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));

      let urlObj;
      try {
        urlObj = new URL(targetUrl);
      } catch (e) {
        return reject(new Error('Invalid URL'));
      }

      https.get({
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'image/*,*/*'
        }
      }, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          return request(response.headers.location, redirects + 1);
        }
        if (response.statusCode !== 200) {
          return reject(new Error(`HTTP ${response.statusCode}`));
        }

        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          // Only save if it's a real image (> 5KB)
          if (buffer.length > 5000) {
            fs.writeFileSync(outputPath, buffer);
            resolve(buffer.length);
          } else {
            reject(new Error('Image too small'));
          }
        });
        response.on('error', reject);
      }).on('error', reject);
    };

    request(url);
  });
}

async function processProduct(slug, product) {
  console.log(`\n📦 ${product.name}`);

  for (const url of product.urls) {
    console.log(`   Trying: ${url}`);

    try {
      const result = await firecrawlScrape(url);

      if (!result.success) {
        console.log(`   ✗ Scrape failed`);
        continue;
      }

      const html = result.data?.html || '';
      const images = extractImageUrls(html, url);
      console.log(`   Found ${images.length} potential images`);

      if (images.length === 0) continue;

      // Try to download the first good image
      for (const imgUrl of images.slice(0, 5)) {
        try {
          const ext = imgUrl.includes('.png') ? 'png' : 'jpg';
          const outputPath = path.join(OUTPUT_DIR, `${slug}.${ext}`);
          const size = await downloadImage(imgUrl, outputPath);
          console.log(`   ✓ Downloaded: ${(size/1024).toFixed(1)}KB`);
          return `/images/gear/products/${slug}.${ext}`;
        } catch (err) {
          // Try next image
          continue;
        }
      }
    } catch (error) {
      console.log(`   ✗ Error: ${error.message}`);
    }
  }

  console.log(`   ✗ Could not find any valid image`);
  return null;
}

async function main() {
  console.log('🔥 Fetching missing product images with Firecrawl\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = {};

  for (const [slug, product] of Object.entries(PRODUCTS)) {
    const imagePath = await processProduct(slug, product);
    if (imagePath) {
      results[product.name] = imagePath;
    }

    // Rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully downloaded: ${Object.keys(results).length}/${Object.keys(PRODUCTS).length}`);

  if (Object.keys(results).length > 0) {
    console.log('\nResults:');
    for (const [name, path] of Object.entries(results)) {
      console.log(`  ${name}: ${path}`);
    }
  }
}

main().catch(console.error);
