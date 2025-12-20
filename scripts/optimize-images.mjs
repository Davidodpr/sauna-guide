#!/usr/bin/env node

/**
 * ShortPixel Image Optimization Script
 *
 * Optimerar alla bilder i public/images med ShortPixel API:
 * - Komprimerar bilder (glossy för bästa balans)
 * - Konverterar till WebP
 * - Max bredd 1600px för webb
 *
 * Användning:
 *   SHORTPIXEL_API_KEY=din_nyckel node scripts/optimize-images.mjs
 *   SHORTPIXEL_API_KEY=din_nyckel node scripts/optimize-images.mjs --dry-run
 *   SHORTPIXEL_API_KEY=din_nyckel node scripts/optimize-images.mjs --single public/images/test.jpg
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'public/images');
const BACKUP_DIR = path.join(ROOT_DIR, 'public/images-backup');

const API_KEY = process.env.SHORTPIXEL_API_KEY;
const DRY_RUN = process.argv.includes('--dry-run');
const SINGLE_FILE = process.argv.includes('--single')
  ? process.argv[process.argv.indexOf('--single') + 1]
  : null;

// Supported formats
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

async function findImages(dir) {
  const images = [];

  function scanDir(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory() && entry.name !== 'images-backup') {
        scanDir(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  }

  scanDir(dir);
  return images;
}

function createMultipartBody(imagePath, boundary, urlList = null) {
  const fileName = path.basename(imagePath);
  const fileFieldName = 'file1';

  const fields = {
    key: API_KEY,
    plugin_version: 'SG10',
    lossy: '2',            // 0=lossless, 1=lossy, 2=glossy
    resize: '1',
    resize_width: '1600',
    resize_height: '1200',
    keep_exif: '0',
    convertto: '+webp',
    wait: '30'
  };

  // If we have a URL list, we're checking status
  if (urlList) {
    fields.file_urls = JSON.stringify(urlList);
  } else {
    fields.file_paths = JSON.stringify({ [fileFieldName]: fileName });
  }

  const parts = [];

  for (const [key, value] of Object.entries(fields)) {
    parts.push(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${key}"\r\n\r\n` +
      `${value}\r\n`
    );
  }

  // Add file if not checking status
  if (!urlList) {
    const imageBuffer = fs.readFileSync(imagePath);
    const fileHeader =
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${fileFieldName}"; filename="${fileName}"\r\n` +
      `Content-Type: application/octet-stream\r\n\r\n`;

    const fileFooter = `\r\n--${boundary}--\r\n`;

    return Buffer.concat([
      Buffer.from(parts.join(''), 'utf8'),
      Buffer.from(fileHeader, 'utf8'),
      imageBuffer,
      Buffer.from(fileFooter, 'utf8')
    ]);
  }

  return Buffer.from(parts.join('') + `--${boundary}--\r\n`, 'utf8');
}

async function callShortPixelApi(imagePath, urlList = null) {
  return new Promise((resolve, reject) => {
    const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
    const body = createMultipartBody(imagePath, boundary, urlList);

    const options = {
      hostname: 'api.shortpixel.com',
      port: 443,
      path: '/v2/post-reducer.php',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      }
    };

    const req = https.request(options, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        try {
          const responseBody = Buffer.concat(data).toString('utf8');
          const result = JSON.parse(responseBody);
          resolve(result);
        } catch (e) {
          reject(new Error(`Failed to parse: ${Buffer.concat(data).toString('utf8')}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function optimizeWithPolling(imagePath, maxAttempts = 10) {
  // Initial upload
  let result = await callShortPixelApi(imagePath);
  let imageResult = Array.isArray(result) ? result[0] : result;

  // Poll for completion
  let attempts = 0;
  while (imageResult.Status && parseInt(imageResult.Status.Code, 10) === 1 && attempts < maxAttempts) {
    attempts++;
    console.log(`  ⏳ Processing... (attempt ${attempts}/${maxAttempts})`);
    await new Promise(r => setTimeout(r, 5000)); // Wait 5 seconds

    // Check status using LossyURL from the initial response if available
    if (imageResult.OriginalURL) {
      result = await callShortPixelApi(imagePath, [imageResult.OriginalURL]);
    } else {
      result = await callShortPixelApi(imagePath);
    }
    imageResult = Array.isArray(result) ? result[0] : result;
  }

  return imageResult;
}

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);

    const request = (targetUrl) => {
      const client = targetUrl.startsWith('https') ? https : http;
      client.get(targetUrl, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          file.close();
          fs.unlinkSync(destPath);
          request(response.headers.location);
        } else if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        } else {
          file.close();
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      }).on('error', (err) => {
        file.close();
        reject(err);
      });
    };

    request(url);
  });
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

async function processImage(imagePath, index, total) {
  const relativePath = path.relative(ROOT_DIR, imagePath);
  const originalSize = fs.statSync(imagePath).size;

  console.log(`\n[${index + 1}/${total}] ${relativePath}`);
  console.log(`  Original: ${formatBytes(originalSize)}`);

  if (DRY_RUN) {
    console.log('  [DRY RUN] Would optimize');
    return { saved: 0, originalSize };
  }

  try {
    const imageResult = await optimizeWithPolling(imagePath);

    // Check for errors
    if (imageResult.Status) {
      const code = parseInt(imageResult.Status.Code, 10);
      if (code !== 2) {
        console.log(`  ⚠️ ${imageResult.Status.Message || `Code: ${code}`}`);
        return { saved: 0, originalSize };
      }
    }

    // Backup original
    const backupPath = path.join(BACKUP_DIR, relativePath.replace('public/images/', ''));
    const backupDir = path.dirname(backupPath);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    fs.copyFileSync(imagePath, backupPath);

    // Download optimized version
    const optimizedUrl = imageResult.LossyURL || imageResult.LosslessURL;
    if (optimizedUrl) {
      await downloadFile(optimizedUrl, imagePath);
      const newSize = fs.statSync(imagePath).size;
      const saved = originalSize - newSize;
      const percent = ((saved / originalSize) * 100).toFixed(1);
      console.log(`  ✅ Optimized: ${formatBytes(newSize)} (−${percent}%)`);

      // Download WebP
      const webpUrl = imageResult.WebPLossyURL || imageResult.WebPLosslessURL;
      if (webpUrl) {
        const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        await downloadFile(webpUrl, webpPath);
        const webpSize = fs.statSync(webpPath).size;
        console.log(`  ✅ WebP: ${formatBytes(webpSize)}`);
      }

      return { saved, originalSize };
    }

    console.log(`  ⚠️ No URL: ${JSON.stringify(imageResult).slice(0, 200)}`);
    return { saved: 0, originalSize };

  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return { saved: 0, originalSize };
  }
}

async function main() {
  console.log('🔥 ShortPixel Image Optimizer\n');

  if (!API_KEY) {
    console.error('❌ Missing SHORTPIXEL_API_KEY');
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE\n');
  }

  let images;
  if (SINGLE_FILE) {
    const fullPath = path.isAbsolute(SINGLE_FILE)
      ? SINGLE_FILE
      : path.join(ROOT_DIR, SINGLE_FILE);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${SINGLE_FILE}`);
      process.exit(1);
    }
    images = [fullPath];
    console.log(`Processing: ${SINGLE_FILE}`);
  } else {
    images = await findImages(IMAGES_DIR);
    console.log(`Found ${images.length} images`);
  }

  if (!DRY_RUN && !fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  let totalOriginal = 0;
  let totalSaved = 0;

  for (let i = 0; i < images.length; i++) {
    const { saved, originalSize } = await processImage(images[i], i, images.length);
    totalOriginal += originalSize;
    totalSaved += saved;

    if (i < images.length - 1 && !DRY_RUN) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary');
  console.log('='.repeat(50));
  console.log(`  Images: ${images.length}`);
  console.log(`  Original: ${formatBytes(totalOriginal)}`);
  if (!DRY_RUN && totalSaved > 0) {
    console.log(`  Saved: ${formatBytes(totalSaved)} (${((totalSaved / totalOriginal) * 100).toFixed(1)}%)`);
    console.log(`  New total: ${formatBytes(totalOriginal - totalSaved)}`);
    console.log(`\n  Backups: ${BACKUP_DIR}`);
  }
}

main().catch(console.error);
