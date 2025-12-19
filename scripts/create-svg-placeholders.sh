#!/bin/bash
# Create SVG placeholder images with brand colors
# These can be used immediately until real images are generated

OUTPUT_DIR="../public/images"
mkdir -p "$OUTPUT_DIR"

echo "=========================================="
echo "Creating SVG placeholder images..."
echo "=========================================="

# Hero image (16:9 - 1920x1080)
cat > "$OUTPUT_DIR/hero-finnish-sauna.svg" << 'EOF'
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#DEB887;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#CD5C5C;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#heroGrad)"/>
  <text x="960" y="500" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="rgba(255,255,255,0.9)" text-anchor="middle">FINNISH SAUNA INTERIOR</text>
  <text x="960" y="580" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.7)" text-anchor="middle">Placeholder - Generate with NanoBanana</text>
</svg>
EOF

echo "✓ Created hero-finnish-sauna.svg (1920x1080)"

# Contrast therapy image (1:1 - 1080x1080)
cat > "$OUTPUT_DIR/contrast-therapy-wellness.svg" << 'EOF'
<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="contrastGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#CD5C5C;stop-opacity:1" />
      <stop offset="30%" style="stop-color:#DEB887;stop-opacity:1" />
      <stop offset="70%" style="stop-color:#E8E4E1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4682B4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#contrastGrad)"/>
  <text x="540" y="500" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="rgba(255,255,255,0.9)" text-anchor="middle">CONTRAST THERAPY</text>
  <text x="540" y="580" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.7)" text-anchor="middle">Placeholder - Generate with NanoBanana</text>
</svg>
EOF

echo "✓ Created contrast-therapy-wellness.svg (1080x1080)"

# Newsletter community image (1:1 - 1080x1080)
cat > "$OUTPUT_DIR/newsletter-community-sauna.svg" << 'EOF'
<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="communityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#DEB887;stop-opacity:1" />
      <stop offset="60%" style="stop-color:#8B4513;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#CD5C5C;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#communityGrad)"/>
  <text x="540" y="500" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="rgba(255,255,255,0.9)" text-anchor="middle">LAKESIDE SAUNA</text>
  <text x="540" y="580" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.7)" text-anchor="middle">Placeholder - Generate with NanoBanana</text>
</svg>
EOF

echo "✓ Created newsletter-community-sauna.svg (1080x1080)"

echo ""
echo "=========================================="
echo "Complete! 3 SVG placeholders created"
echo "=========================================="
echo ""
echo "Location: $OUTPUT_DIR"
echo ""
echo "Next steps to generate real images:"
echo "1. Get API key: https://aistudio.google.com/app/apikey"
echo "2. export GOOGLE_AI_API_KEY='your-key'"
echo "3. pip install google-generativeai"
echo "4. python3 scripts/generate-images.py"
echo ""
