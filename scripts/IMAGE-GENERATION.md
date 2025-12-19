# Image Generation with NanoBanana (Gemini 2.5 Flash Image)

This guide explains how to generate brand-aligned images for the Sauna Guide website using Google's Gemini 2.5 Flash Image model (also known as NanoBanana).

## What is NanoBanana?

NanoBanana is Google DeepMind's state-of-the-art image generation and editing model, released as **Gemini 2.5 Flash Image** in August 2025. It offers:

- Advanced image generation from text prompts
- Character consistency and scene blending
- Natural language-based editing
- High-quality output with intelligent upscaling
- Cost-effective pricing: ~$0.039 per image

## Setup

### 1. Get a Google AI API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API key"
3. Generate a new key from your Google Cloud project
4. Copy the API key

### 2. Set Environment Variable

```bash
# Add to your ~/.zshrc or ~/.bashrc
export GOOGLE_AI_API_KEY="your-api-key-here"

# Or set it temporarily
export GOOGLE_AI_API_KEY="your-api-key-here"
```

### 3. Install Python Dependencies

```bash
pip install google-generativeai
```

## Usage

### Generate Images from Prompts

The image prompts are stored in `/src/data/image-prompts.json` with optimized prompts for each image.

```bash
# Generate all images defined in image-prompts.json
python3 scripts/generate-images.py
```

Images will be saved to `/public/images/` with the filenames specified in the prompts file.

## Current Image Set

### 1. Hero Finnish Sauna (16:9)
- **File**: `hero-finnish-sauna.jpg`
- **Purpose**: Homepage hero image
- **Style**: Luxurious interior, warm woods, gentle steam
- **Colors**: Rich browns, copper, amber tones

### 2. Contrast Therapy Wellness (1:1)
- **File**: `contrast-therapy-wellness.jpg`
- **Purpose**: Blog featured image for contrast therapy guides
- **Style**: Artistic split composition, warm vs. cool elements
- **Colors**: Amber/copper vs. Nordic blues and whites

### 3. Newsletter Community Sauna (1:1)
- **File**: `newsletter-community-sauna.jpg`
- **Purpose**: Newsletter header and community content
- **Style**: Traditional lakeside sauna at golden hour
- **Colors**: Warm wood tones, golden light, cream/white

## Adding New Image Prompts

Edit `/src/data/image-prompts.json`:

```json
{
  "imageId": "unique-id",
  "purpose": "blog-featured|social|newsletter|hero",
  "prompt": "Detailed prompt following brand guidelines...",
  "dimensions": "16:9|1:1|4:5",
  "altText": "SEO-optimized alt text with keywords",
  "filename": "descriptive-filename.jpg",
  "articleAssociation": "/guides/article-slug",
  "brandColors": ["#8B4513", "#DEB887", "#CD5C5C"],
  "mood": "descriptive mood keywords"
}
```

## Brand Guidelines for Prompts

### Color Palette
- Warm wood tones: `#8B4513`, `#DEB887`
- Steam/mist whites: `#E8E4E1`, `#F5F5F5`
- Heat accent: `#CD5C5C`, `#B22222`
- Nordic blues (contrast): `#4682B4`

### Visual Themes
- **Authentic Finnish**: Wooden saunas, birch branches, lakes
- **Modern Wellness**: Clean lines, minimalist spas, steam
- **Nature Connection**: Forests, snow, natural settings
- **Health/Vitality**: Glowing, relaxation, wellness

### Style Preferences
- Photorealistic or artistic illustration
- Warm, inviting atmosphere
- Include human elements when appropriate (but not for current set)
- Avoid generic stock photo aesthetics
- Professional, high-end spa quality

## Pricing

- **Model**: Gemini 2.5 Flash Image
- **Cost**: $30.00 per 1 million output tokens
- **Per Image**: ~1290 tokens = $0.039 per image
- **Current Set**: 3 images = ~$0.12 total

## Alternative: Web Interface

If you prefer not to use the Python script, you can:

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Use the image generation interface
3. Copy prompts from `/src/data/image-prompts.json`
4. Download and save to `/public/images/`

## Troubleshooting

### API Key Issues
```bash
# Verify API key is set
echo $GOOGLE_AI_API_KEY

# Test API connection
python3 -c "import google.generativeai as genai; genai.configure(api_key='YOUR_KEY'); print('Connected!')"
```

### Model Not Available
The model name may change. Check [Google AI documentation](https://ai.google.dev/) for the latest model name. Update in `generate-images.py` if needed.

### Image Quality
Adjust prompts in `image-prompts.json` to refine:
- Add more specific lighting details
- Specify exact color codes
- Include composition keywords (rule of thirds, golden hour, etc.)
- Add quality modifiers (8k, cinematic, professional photography)

## Resources

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [NanoBanana Announcement](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/)
- [Pricing Information](https://ai.google.dev/pricing)

## Next Steps

After generating images:

1. Optimize for web (compress without quality loss)
2. Add to sitemap for SEO
3. Update component imports to use new images
4. Test loading performance
5. Add structured data for image SEO
