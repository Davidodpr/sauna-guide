#!/usr/bin/env node

/**
 * Create beautiful SVG placeholders for gear categories
 * Matches the warm, Scandinavian aesthetic of the site
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = 'public/images/gear';

// Category designs with icons and colors
const CATEGORIES = {
  essentials: {
    color1: '#D4A574',
    color2: '#C49464',
    icon: `<path d="M200 120 L200 280 Q200 300 220 300 L380 300 Q400 300 400 280 L400 120 Q400 100 380 100 L220 100 Q200 100 200 120" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <path d="M240 100 L240 60 Q290 40 360 60 L360 100" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <ellipse cx="300" cy="200" rx="60" ry="20" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>`,
    label: 'Essentials'
  },
  comfort: {
    color1: '#E8DDD4',
    color2: '#D4C4B4',
    icon: `<rect x="220" y="140" width="160" height="120" rx="8" stroke="#8B7355" stroke-width="3" fill="none" opacity="0.5"/>
           <line x1="220" y1="180" x2="380" y2="180" stroke="#8B7355" stroke-width="2" opacity="0.3"/>
           <line x1="220" y1="220" x2="380" y2="220" stroke="#8B7355" stroke-width="2" opacity="0.3"/>`,
    label: 'Comfort'
  },
  aromatherapy: {
    color1: '#7D9471',
    color2: '#6D8461',
    icon: `<path d="M280 280 L280 180 M320 280 L320 200" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <ellipse cx="280" cy="160" rx="30" ry="40" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <ellipse cx="320" cy="180" rx="25" ry="35" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <path d="M250 140 Q300 100 350 140" stroke="white" stroke-width="2" fill="none" opacity="0.2"/>`,
    label: 'Aromatherapy'
  },
  'cold-therapy': {
    color1: '#5B9BD5',
    color2: '#4B8BC5',
    icon: `<circle cx="300" cy="200" r="70" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <path d="M300 130 L300 270 M230 200 L370 200 M250 150 L350 250 M350 150 L250 250" stroke="white" stroke-width="2" opacity="0.3"/>`,
    label: 'Cold Therapy'
  },
  tracking: {
    color1: '#4A4A4A',
    color2: '#3A3A3A',
    icon: `<circle cx="300" cy="200" r="60" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <circle cx="300" cy="200" r="45" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <path d="M300 155 L300 200 L330 220" stroke="white" stroke-width="3" fill="none" opacity="0.5"/>`,
    label: 'Tracking'
  },
  recovery: {
    color1: '#8B6B4F',
    color2: '#7B5B3F',
    icon: `<ellipse cx="300" cy="200" rx="80" ry="30" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <path d="M220 200 Q300 140 380 200" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <path d="M240 200 Q300 250 360 200" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>`,
    label: 'Recovery'
  },
  'red-light': {
    color1: '#B83232',
    color2: '#A82222',
    icon: `<rect x="240" y="120" width="120" height="160" rx="8" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <line x1="260" y1="150" x2="340" y2="150" stroke="white" stroke-width="2" opacity="0.5"/>
           <line x1="260" y1="180" x2="340" y2="180" stroke="white" stroke-width="2" opacity="0.4"/>
           <line x1="260" y1="210" x2="340" y2="210" stroke="white" stroke-width="2" opacity="0.3"/>
           <line x1="260" y1="240" x2="340" y2="240" stroke="white" stroke-width="2" opacity="0.2"/>`,
    label: 'Red Light'
  },
  infrared: {
    color1: '#D4744A',
    color2: '#C4643A',
    icon: `<rect x="220" y="130" width="160" height="140" rx="4" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <path d="M240 150 Q300 180 360 150" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <path d="M240 190 Q300 220 360 190" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <path d="M240 230 Q300 260 360 230" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>`,
    label: 'Infrared'
  },
  'portable-saunas': {
    color1: '#C19A6B',
    color2: '#B18A5B',
    icon: `<path d="M240 280 L240 160 Q240 120 280 120 L320 120 Q360 120 360 160 L360 280" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <ellipse cx="300" cy="280" rx="80" ry="20" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <circle cx="300" cy="100" r="15" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>`,
    label: 'Portable'
  },
  'barrel-saunas': {
    color1: '#8B7355',
    color2: '#7B6345',
    icon: `<ellipse cx="220" cy="200" rx="30" ry="70" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <ellipse cx="380" cy="200" rx="30" ry="70" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <line x1="220" y1="130" x2="380" y2="130" stroke="white" stroke-width="2" opacity="0.3"/>
           <line x1="220" y1="200" x2="380" y2="200" stroke="white" stroke-width="2" opacity="0.3"/>
           <line x1="220" y1="270" x2="380" y2="270" stroke="white" stroke-width="2" opacity="0.3"/>`,
    label: 'Barrel Saunas'
  },
  heaters: {
    color1: '#D4844A',
    color2: '#C4743A',
    icon: `<path d="M260 280 L260 180 Q260 140 300 140 Q340 140 340 180 L340 280" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <circle cx="280" cy="200" r="12" fill="white" opacity="0.3"/>
           <circle cx="320" cy="200" r="12" fill="white" opacity="0.3"/>
           <circle cx="300" cy="230" r="12" fill="white" opacity="0.3"/>
           <path d="M270 120 Q300 80 330 120" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>`,
    label: 'Heaters'
  },
  tech: {
    color1: '#3D5A5A',
    color2: '#2D4A4A',
    icon: `<rect x="230" y="140" width="140" height="100" rx="8" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <rect x="250" y="160" width="100" height="60" rx="4" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <circle cx="270" cy="260" r="8" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <circle cx="300" cy="260" r="8" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <circle cx="330" cy="260" r="8" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>`,
    label: 'Tech'
  },
  maintenance: {
    color1: '#9A9A8A',
    color2: '#8A8A7A',
    icon: `<path d="M260 160 L260 260 L340 260 L340 200 L300 200 L300 160 Z" stroke="white" stroke-width="3" fill="none" opacity="0.4"/>
           <circle cx="280" cy="220" r="15" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
           <line x1="320" y1="180" x2="360" y2="140" stroke="white" stroke-width="3" opacity="0.4"/>`,
    label: 'Maintenance'
  }
};

function createSVG(category, config) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="bg-${category}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.color1}"/>
      <stop offset="100%" style="stop-color:${config.color2}"/>
    </linearGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" result="noise"/>
      <feColorMatrix type="saturate" values="0"/>
      <feBlend in="SourceGraphic" in2="noise" mode="multiply" result="blend"/>
      <feComposite in="blend" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
  <rect width="600" height="400" fill="url(#bg-${category})"/>
  <g transform="translate(0, 0)">
    ${config.icon}
  </g>
  <text x="300" y="340" font-family="Georgia, serif" font-size="18" font-weight="400" fill="white" fill-opacity="0.6" text-anchor="middle" letter-spacing="3">${config.label.toUpperCase()}</text>
</svg>`;
}

async function main() {
  console.log('🎨 Creating gear category placeholders\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const [category, config] of Object.entries(CATEGORIES)) {
    const svg = createSVG(category, config);
    const outputPath = path.join(OUTPUT_DIR, `${category}.svg`);
    fs.writeFileSync(outputPath, svg);
    console.log(`  ✓ ${category}.svg`);
  }

  console.log(`\n✅ Created ${Object.keys(CATEGORIES).length} category images`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);

  // Now update gear-merged.json to use category images
  console.log('\n📝 Updating gear data...');
  const gearData = JSON.parse(fs.readFileSync('src/data/gear-merged.json', 'utf-8'));

  for (const category of gearData.categories) {
    const imagePath = `/images/gear/${category.id}.svg`;
    for (const product of category.products) {
      product.image = imagePath;
    }
  }

  fs.writeFileSync('src/data/gear-merged.json', JSON.stringify(gearData, null, 2));
  console.log('  ✓ Updated product images to use category placeholders');
}

main().catch(console.error);
