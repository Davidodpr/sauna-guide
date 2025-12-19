#!/usr/bin/env node
/**
 * Generate placeholder images for development
 * Creates gradient placeholders with the correct aspect ratios and brand colors
 * Use this until you generate real images with NanoBanana
 */

const fs = require('fs');
const path = require('path');

// This requires canvas package: npm install canvas
let Canvas;
try {
  Canvas = require('canvas');
} catch (e) {
  console.error('Error: canvas package not installed');
  console.error('Install with: npm install canvas');
  process.exit(1);
}

const { createCanvas } = Canvas;

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');
const PROMPTS_FILE = path.join(__dirname, '..', 'src', 'data', 'image-prompts.json');

// Brand colors
const COLORS = {
  warmWood: '#8B4513',
  lightWood: '#DEB887',
  steamWhite: '#E8E4E1',
  heatAccent: '#CD5C5C',
  nordicBlue: '#4682B4'
};

function getDimensions(aspectRatio) {
  switch (aspectRatio) {
    case '16:9':
      return { width: 1920, height: 1080 };
    case '1:1':
      return { width: 1080, height: 1080 };
    case '4:5':
      return { width: 1080, height: 1350 };
    default:
      return { width: 1200, height: 630 };
  }
}

function createGradientPlaceholder(imageData) {
  const { width, height } = getDimensions(imageData.dimensions);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Create gradient based on image purpose
  let gradient;
  if (imageData.purpose === 'hero') {
    // Warm wood gradient for hero
    gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, COLORS.warmWood);
    gradient.addColorStop(0.5, COLORS.lightWood);
    gradient.addColorStop(1, COLORS.heatAccent);
  } else if (imageData.imageId.includes('contrast')) {
    // Warm to cool gradient for contrast therapy
    gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, COLORS.heatAccent);
    gradient.addColorStop(0.3, COLORS.lightWood);
    gradient.addColorStop(0.7, COLORS.steamWhite);
    gradient.addColorStop(1, COLORS.nordicBlue);
  } else {
    // Community/newsletter gradient
    gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, COLORS.lightWood);
    gradient.addColorStop(0.6, COLORS.warmWood);
    gradient.addColorStop(1, COLORS.heatAccent);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add text overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const title = imageData.filename.replace('.jpg', '').replace(/-/g, ' ').toUpperCase();
  ctx.fillText(title, width / 2, height / 2 - 30);

  ctx.font = '24px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('PLACEHOLDER - Generate with NanoBanana', width / 2, height / 2 + 30);

  return canvas;
}

function main() {
  console.log('='.repeat(60));
  console.log('Sauna Guide Placeholder Image Generator');
  console.log('='.repeat(60));

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load prompts
  const promptsData = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf8'));
  const prompts = promptsData.images;

  console.log(`\nGenerating ${prompts.length} placeholder images...\n`);

  let successCount = 0;

  prompts.forEach((imageData, index) => {
    try {
      console.log(`[${index + 1}/${prompts.length}] ${imageData.filename}`);

      const canvas = createGradientPlaceholder(imageData);
      const outputPath = path.join(OUTPUT_DIR, imageData.filename);

      const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
      fs.writeFileSync(outputPath, buffer);

      console.log(`  ✓ Saved to: ${outputPath}`);
      successCount++;
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(`Complete: ${successCount}/${prompts.length} placeholders generated`);
  console.log('='.repeat(60));
  console.log('\nNext steps:');
  console.log('1. Get Google AI API key from https://aistudio.google.com/app/apikey');
  console.log('2. Set GOOGLE_AI_API_KEY environment variable');
  console.log('3. Run: python3 scripts/generate-images.py');
  console.log('   Or use the web interface at https://aistudio.google.com/');
}

if (require.main === module) {
  main();
}
