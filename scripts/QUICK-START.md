# Quick Start: Generate Sauna Images with NanoBanana

## TL;DR - 3 Steps to Real Images

```bash
# 1. Get API key and set it
export GOOGLE_AI_API_KEY="your-key-from-google-ai-studio"

# 2. Install Python package
pip install google-generativeai

# 3. Generate images
python3 scripts/generate-images.py
```

Done! Images will be in `/public/images/`

## Get Your API Key

Visit: https://aistudio.google.com/app/apikey
- Click "Create API key"
- Copy the key
- Set as environment variable

## What You Get

3 brand-aligned images:
1. **hero-finnish-sauna.jpg** (1920x1080) - Homepage hero
2. **contrast-therapy-wellness.jpg** (1080x1080) - Blog featured
3. **newsletter-community-sauna.jpg** (1080x1080) - Newsletter header

Cost: ~$0.12 total

## Current Status

**Placeholders available now**: 3 SVG files already in `/public/images/`
- Use these immediately in your website
- Replace with real images when ready

## Alternative: Manual Generation

Don't want to use Python?
1. Go to https://aistudio.google.com/
2. Use image generation interface
3. Copy prompts from `/src/data/image-prompts.json`
4. Download and rename files

## Files Created

- `/src/data/image-prompts.json` - Optimized prompts
- `/scripts/generate-images.py` - Generator script
- `/scripts/IMAGE-GENERATION.md` - Full docs
- `/public/images/*.svg` - Placeholders (ready now)

## Troubleshooting

**"No API key found"**
```bash
echo $GOOGLE_AI_API_KEY  # Should show your key
export GOOGLE_AI_API_KEY="your-key"
```

**"Module not found: google.generativeai"**
```bash
pip install google-generativeai
```

**"Model not available"**
- Check the latest model name at https://ai.google.dev/
- Update model name in `generate-images.py` if needed

## Questions?

Read the full documentation: `/scripts/IMAGE-GENERATION.md`
