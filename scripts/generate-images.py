#!/usr/bin/env python3
"""
Generate images using Google Gemini 2.5 Flash Image (NanoBanana)
Reads prompts from src/data/image-prompts.json and generates images
"""

import json
import os
import sys
from pathlib import Path

try:
    import google.generativeai as genai
except ImportError:
    print("ERROR: google-generativeai package not installed")
    print("Install with: pip install google-generativeai")
    sys.exit(1)

# Configuration
PROJECT_ROOT = Path(__file__).parent.parent
PROMPTS_FILE = PROJECT_ROOT / "src" / "data" / "image-prompts.json"
OUTPUT_DIR = PROJECT_ROOT / "public" / "images"

def setup_gemini_api():
    """Configure Gemini API with key from environment"""
    api_key = os.getenv("GOOGLE_AI_API_KEY") or os.getenv("GEMINI_API_KEY")

    if not api_key:
        print("ERROR: No API key found!")
        print("Set GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable")
        print("\nGet your API key from: https://aistudio.google.com/app/apikey")
        sys.exit(1)

    genai.configure(api_key=api_key)
    return genai

def load_prompts():
    """Load image prompts from JSON file"""
    with open(PROMPTS_FILE, 'r') as f:
        data = json.load(f)
    return data['images']

def generate_image(prompt_data, model):
    """Generate a single image using Gemini"""
    print(f"\nGenerating: {prompt_data['filename']}")
    print(f"Purpose: {prompt_data['purpose']}")
    print(f"Dimensions: {prompt_data['dimensions']}")

    try:
        # Generate image using Gemini 2.5 Flash Image
        response = model.generate_content([
            prompt_data['prompt']
        ])

        # Save the image
        output_path = OUTPUT_DIR / prompt_data['filename']

        # The response contains the image data
        if hasattr(response, 'images') and response.images:
            image_data = response.images[0]
            with open(output_path, 'wb') as f:
                f.write(image_data)
            print(f"✓ Saved to: {output_path}")
            return True
        else:
            print(f"✗ No image generated. Response: {response}")
            return False

    except Exception as e:
        print(f"✗ Error generating image: {e}")
        return False

def main():
    """Main execution flow"""
    print("=" * 60)
    print("Sauna Guide Image Generator")
    print("Using Google Gemini 2.5 Flash Image (NanoBanana)")
    print("=" * 60)

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Setup API
    genai = setup_gemini_api()

    # Initialize the model
    # Use gemini-2.5-flash-image or the appropriate model name
    model = genai.GenerativeModel('gemini-2.5-flash-image')

    # Load prompts
    prompts = load_prompts()
    print(f"\nLoaded {len(prompts)} image prompts")

    # Generate each image
    success_count = 0
    for i, prompt_data in enumerate(prompts, 1):
        print(f"\n[{i}/{len(prompts)}]", end=" ")
        if generate_image(prompt_data, model):
            success_count += 1

    # Summary
    print("\n" + "=" * 60)
    print(f"Generation complete: {success_count}/{len(prompts)} successful")
    print("=" * 60)

if __name__ == "__main__":
    main()
