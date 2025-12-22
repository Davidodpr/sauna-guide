#!/usr/bin/env node

/**
 * Fetch product images using Firecrawl API
 * Scrapes manufacturer websites for real product photos
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'fc-bc24f10a07104dc9a7eb377a19ee8fad';
const OUTPUT_DIR = 'public/images/gear/products';

// Product URLs from manufacturers (not Amazon)
const PRODUCT_SOURCES = {
  // Cold Therapy
  "Plunge Cold Tub": "https://www.plunge.com/products/plunge-all-in",
  "Ice Barrel": "https://icebarrel.com/product/ice-barrel-400/",

  // Infrared & Recovery
  "HigherDOSE Infrared Sauna Blanket": "https://higherdose.com/products/infrared-sauna-blanket",
  "Theragun PRO": "https://www.therabody.com/us/en-us/theragun-pro.html",

  // Tracking
  "Oura Ring Gen 3": "https://ouraring.com/product/rings",

  // Heaters
  "HUUM DROP": "https://huumsauna.com/products/huum-drop",
  "Harvia Cilindro": "https://harvia.com/products/cilindro/",

  // Essentials - Finnish brands
  "Rento Pisara Bucket and Ladle": "https://rentodesign.fi/en/product/pisara-sauna-bucket/",

  // Red Light
  "Mito Red Light MitoPRO": "https://mitoredlight.com/products/mitopro-series",

  // Portable
  "SaunaSpace Luminati": "https://sauna.space/products/luminati",
  "SweatTent": "https://www.sweattent.com/products/sweat-tent",
};

async function firecrawlScrape(url) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: url,
      formats: ['markdown', 'html'],
      onlyMainContent: false,
      includeTags: ['img'],
      waitFor: 2000
    });

    const options = {
      hostname: 'api.firecrawl.dev',
      port: 443,
      path: '/v1/scrape',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (e) {
          reject(new Error(`Parse error: ${data.slice(0, 200)}`));
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

  // Find all img src attributes
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    let src = match[1];

    // Skip tiny images, icons, logos
    if (src.includes('logo') || src.includes('icon') || src.includes('favicon')) continue;
    if (src.includes('1x1') || src.includes('pixel')) continue;

    // Make absolute URL
    if (src.startsWith('//')) {
      src = 'https:' + src;
    } else if (src.startsWith('/')) {
      const urlObj = new URL(baseUrl);
      src = urlObj.origin + src;
    }

    // Only keep product-like images
    if (src.includes('product') || src.includes('cdn') || src.includes('shopify') ||
        src.includes('jpg') || src.includes('png') || src.includes('webp')) {
      images.push(src);
    }
  }

  return images;
}

async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const client = https;

    const request = (targetUrl, redirectCount = 0) => {
      if (redirectCount > 5) {
        reject(new Error('Too many redirects'));
        return;
      }

      const urlObj = new URL(targetUrl);

      client.get({
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'image/*'
        }
      }, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          request(response.headers.location, redirectCount + 1);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }

        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          if (buffer.length > 5000) { // Only save if > 5KB (not a tiny placeholder)
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

async function processProduct(productName, sourceUrl) {
  const safeName = productName.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);

  console.log(`\n📦 ${productName}`);
  console.log(`   Source: ${sourceUrl}`);

  try {
    const result = await firecrawlScrape(sourceUrl);

    if (!result.success) {
      console.log(`   ✗ Scrape failed: ${result.error || 'Unknown error'}`);
      return null;
    }

    const html = result.data?.html || '';
    const images = extractImageUrls(html, sourceUrl);

    console.log(`   Found ${images.length} potential images`);

    if (images.length === 0) {
      console.log(`   ✗ No product images found`);
      return null;
    }

    // Try to download the first good image
    for (const imgUrl of images.slice(0, 5)) {
      try {
        const ext = imgUrl.includes('.png') ? 'png' : 'jpg';
        const outputPath = path.join(OUTPUT_DIR, `${safeName}.${ext}`);

        const size = await downloadImage(imgUrl, outputPath);
        console.log(`   ✓ Downloaded: ${(size/1024).toFixed(1)}KB`);
        return `/images/gear/products/${safeName}.${ext}`;
      } catch (err) {
        // Try next image
        continue;
      }
    }

    console.log(`   ✗ Could not download any image`);
    return null;

  } catch (error) {
    console.log(`   ✗ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🔥 Fetching gear images with Firecrawl\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = {};
  let success = 0;

  for (const [product, url] of Object.entries(PRODUCT_SOURCES)) {
    const imagePath = await processProduct(product, url);
    if (imagePath) {
      results[product] = imagePath;
      success++;
    }

    // Rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Downloaded ${success}/${Object.keys(PRODUCT_SOURCES).length} product images`);

  // Update gear data with new images
  if (success > 0) {
    console.log('\n📝 Updating gear data...');
    const gearData = JSON.parse(fs.readFileSync('src/data/gear-merged.json', 'utf-8'));

    for (const category of gearData.categories) {
      for (const product of category.products) {
        if (results[product.name]) {
          product.image = results[product.name];
          console.log(`   ✓ ${product.name}`);
        }
      }
    }

    fs.writeFileSync('src/data/gear-merged.json', JSON.stringify(gearData, null, 2));
  }
}

main().catch(console.error);
