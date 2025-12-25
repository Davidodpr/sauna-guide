#!/usr/bin/env node

/**
 * Update gear-merged.json with real product images
 */

import fs from 'fs';

// Map product names to actual image files
const IMAGE_MAP = {
  // Cold Therapy
  "Plunge Cold Tub": "/images/gear/products/plunge-cold-tub.png",
  "Ice Barrel": "/images/gear/products/ice-barrel.png",
  "Morozko Forge": "/images/gear/products/morozko-forge.png",

  // Tracking
  "Oura Ring 4": "/images/gear/products/oura-ring-gen-3.png",

  // Recovery
  "Theragun Prime": "/images/gear/products/theragun-prime.jpg",
  "Theragun Pro Plus": "/images/gear/products/theragun-pro.jpg",

  // Red Light
  "MitoPRO 1500+": "/images/gear/products/mito-red-light-mitopro.png",
  "Joovv Solo": "/images/gear/products/joovv-solo.png",

  // Infrared
  "Sunlighten Solo System": "/images/gear/products/sunlighten-solo-system.png",

  // Portable
  "Sweat Tent": "/images/gear/products/sweattent.png",

  // Heaters
  "Harvia Electric Heater": "/images/gear/products/harvia-cilindro.jpg",

  // Essentials
  "SensorPush HT1 Thermometer": "/images/gear/products/sensorpush-ht1-thermometer.png",
};

// Read gear-merged.json
const data = JSON.parse(fs.readFileSync('src/data/gear-merged.json', 'utf-8'));

let updated = 0;
let removed = 0;

// Update each category
data.categories.forEach(category => {
  category.products.forEach(product => {
    if (IMAGE_MAP[product.name]) {
      product.image = IMAGE_MAP[product.name];
      updated++;
      console.log(`✓ ${product.name} -> ${IMAGE_MAP[product.name]}`);
    } else {
      // Remove placeholder image - let ProductCard show nice fallback
      if (product.image && product.image.includes('/images/gear/') && !product.image.includes('/products/')) {
        delete product.image;
        removed++;
      }
    }
  });
});

// Save updated JSON
fs.writeFileSync('src/data/gear-merged.json', JSON.stringify(data, null, 2));

console.log('\n' + '='.repeat(50));
console.log(`✅ Updated: ${updated} products with real images`);
console.log(`🧹 Removed: ${removed} placeholder images`);
console.log('='.repeat(50));
