# Image Generation Summary - Sauna Guide

## Status: Ready for NanoBanana Generation

I've set up a complete image generation system for your Sauna Guide website using Google's NanoBanana AI (Gemini 2.5 Flash Image).

## What's Been Created

### 1. Image Prompt Library
**File**: `/Users/d/Egna Appar/sauna-guide/src/data/image-prompts.json`

Contains 3 optimized prompts for brand-aligned images:

1. **Hero Finnish Sauna** (16:9)
   - Luxurious interior with warm wood and gentle steam
   - For homepage hero section
   - Colors: Rich browns, copper, amber

2. **Contrast Therapy Wellness** (1:1)
   - Artistic warm-vs-cool visualization
   - For blog featured images
   - Colors: Amber/copper vs. Nordic blues

3. **Newsletter Community Sauna** (1:1)
   - Traditional lakeside sauna at golden hour
   - For newsletter headers and community content
   - Colors: Warm woods, golden light, cream

### 2. Generation Scripts

#### Python Script (Recommended)
**File**: `/Users/d/Egna Appar/sauna-guide/scripts/generate-images.py`

Generates real images using Gemini API:
```bash
# Setup
export GOOGLE_AI_API_KEY="your-key-here"
pip install google-generativeai

# Generate
python3 scripts/generate-images.py
```

#### Placeholder Generator
**File**: `/Users/d/Egna Appar/sauna-guide/scripts/create-svg-placeholders.sh`

Already executed - created SVG placeholders for immediate use.

### 3. Documentation
**File**: `/Users/d/Egna Appar/sauna-guide/scripts/IMAGE-GENERATION.md`

Complete guide covering:
- NanoBanana setup and API key acquisition
- Usage instructions
- Brand guidelines
- Troubleshooting
- Pricing information (~$0.039 per image)

### 4. Placeholder Images (Already Created)

**Location**: `/Users/d/Egna Appar/sauna-guide/public/images/`

Currently available:
- `hero-finnish-sauna.svg` (1920x1080)
- `contrast-therapy-wellness.svg` (1080x1080)
- `newsletter-community-sauna.svg` (1080x1080)

These are brand-colored gradient placeholders you can use immediately while generating the real images.

## Next Steps to Generate Real Images

### Option 1: Python Script (Automated)

```bash
# 1. Get your API key
open https://aistudio.google.com/app/apikey

# 2. Set environment variable
export GOOGLE_AI_API_KEY="your-api-key-here"

# 3. Install dependencies
pip install google-generativeai

# 4. Generate images
cd "/Users/d/Egna Appar/sauna-guide"
python3 scripts/generate-images.py
```

Cost: ~$0.12 total for 3 images

### Option 2: Web Interface (Manual)

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Open image generation interface
3. Copy prompts from `/src/data/image-prompts.json`
4. Paste each prompt and generate
5. Download and save to `/public/images/` with correct filenames:
   - `hero-finnish-sauna.jpg`
   - `contrast-therapy-wellness.jpg`
   - `newsletter-community-sauna.jpg`

## File Structure

```
sauna-guide/
├── public/images/                          # Output directory
│   ├── hero-finnish-sauna.svg             # ✓ Placeholder (ready to use)
│   ├── contrast-therapy-wellness.svg      # ✓ Placeholder (ready to use)
│   └── newsletter-community-sauna.svg     # ✓ Placeholder (ready to use)
├── src/data/
│   └── image-prompts.json                 # ✓ Optimized prompts
└── scripts/
    ├── generate-images.py                 # ✓ Python generator
    ├── generate-placeholders.js           # Alternative (requires canvas)
    ├── create-svg-placeholders.sh         # ✓ Executed
    └── IMAGE-GENERATION.md                # ✓ Full documentation
```

## Brand Guidelines Applied

### Color Palette
- Warm wood tones: #8B4513, #DEB887
- Steam/mist whites: #E8E4E1, #F5F5F5
- Heat accent: #CD5C5C, #B22222
- Nordic blues: #4682B4

### Visual Style
- Photorealistic, professional spa quality
- Warm, inviting atmosphere
- Natural Finnish sauna aesthetic
- High-end wellness focus

### Technical Specs
- Hero: 1920x1080 (16:9)
- Social/Newsletter: 1080x1080 (1:1)
- Format: JPG (high quality)
- SEO-optimized alt text included

## Using the Images in Your Website

Once generated (or using placeholders), import in your components:

```tsx
// In your Next.js components
import Image from 'next/image';

<Image
  src="/images/hero-finnish-sauna.jpg"
  alt="Luxurious Finnish sauna interior with warm wooden walls"
  width={1920}
  height={1080}
  priority
/>
```

## Cost Breakdown

**Gemini 2.5 Flash Image Pricing:**
- $30.00 per 1 million output tokens
- ~1290 tokens per image = $0.039 per image
- Current set (3 images) = $0.12 total

Very cost-effective for high-quality AI-generated images!

## Additional Resources

- **Get API Key**: https://aistudio.google.com/app/apikey
- **Gemini Docs**: https://ai.google.dev/docs
- **NanoBanana Info**: https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/
- **Pricing**: https://ai.google.dev/pricing

## Future Image Needs

To add more images:

1. Edit `/src/data/image-prompts.json`
2. Add new prompt following the template
3. Run `python3 scripts/generate-images.py`
4. Or use web interface with new prompt

## Image SEO Checklist

Each image includes:
- ✓ Descriptive filename
- ✓ SEO-optimized alt text with keywords
- ✓ Proper dimensions specified
- ✓ Brand color alignment
- ✓ Purpose/usage documentation

## Questions or Issues?

Refer to:
- `/scripts/IMAGE-GENERATION.md` - Detailed documentation
- `/src/data/image-prompts.json` - All prompts and metadata

---

**Ready to use**: SVG placeholders are live in `/public/images/`
**Ready to generate**: Python script and prompts are configured
**Next action**: Get Google AI API key and run the generator!
