import * as fs from "node:fs";
import * as path from "node:path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Please set GEMINI_API_KEY environment variable");
  process.exit(1);
}

const images = [
  {
    name: "logo.png",
    prompt: "800x800 pixel logo design split vertically in half to show versatility: LEFT SIDE has warm cream/beige background (#F5EFE7), RIGHT SIDE has dark charcoal background (#1A1A1A). In the CENTER of the entire image is an elegant minimalist logo consisting of concentric circles that INTERWEAVE and SPIRAL together like interlocking waves, representing both heat waves radiating outward and natural wood grain rings. The circular lines should flow and weave through each other in a sophisticated dance, creating a unified spiraling pattern (NOT separate circles). Use warm copper gradient (#D4A574) transitioning to deep wood brown tones (#4A3228) for the interlocking circular lines, with subtle wood grain texture integrated into the strokes. The design should be centered, sophisticated, meditative, premium Scandinavian-Japanese fusion aesthetic. The same logo appears on both backgrounds to demonstrate it works on light AND dark surfaces. Ultra clean professional brand identity, geometric precision, looks like a high-end wellness brand mark.",
  },
  {
    name: "guides/longevity-protocol.jpg",
    prompt: "Serene Finnish lakeside sauna at golden hour, gentle steam rising from chimney, silhouette of elderly person visible through window suggesting longevity and wisdom, warm amber and honey tones, peaceful Nordic landscape, pine trees and calm lake water, symbol of health and long life, premium wellness photography, Scandinavian minimalist aesthetic, 16:9 aspect ratio, ultra high quality, 2K resolution",
  },
  {
    name: "guides/contrast-therapy.jpg",
    prompt: "Dramatic split composition showing contrast therapy concept: left half features hot Finnish sauna interior with warm orange steam and glowing wood, right half shows icy cold plunge pool with cool blue water and ice crystals, artistic color gradient transition in the middle, no people visible, scientific wellness illustration style, professional photography, high contrast between warm and cool tones, 16:9 aspect ratio, 2K resolution",
  },
  {
    name: "guides/male-fertility.jpg",
    prompt: "Abstract minimalist wellness concept for male fertility, artistic composition featuring a medical thermometer and ice cube motif, warm amber cedar sauna wood texture on one side transitioning to cool blue ice elements on the other, scientific medical illustration style, tasteful and professional healthcare aesthetic, no people, subtle symbols of health and vitality, clean modern design, earth tones with blue accents, 16:9 aspect ratio, 2K resolution",
  },
  {
    name: "guides/sauna-for-women.jpg",
    prompt: "Elegant spa sauna interior with feminine wellness aesthetic, fresh eucalyptus branches hanging from cedar wood walls, rose quartz healing stones arranged on bench, soft blush pink and warm cedar wood color palette, Scandinavian minimalist design with Japanese spa influences, ambient warm lighting, no people visible, premium women's wellness photography, peaceful and serene atmosphere, 16:9 aspect ratio, ultra high quality, 2K resolution",
  },
  {
    name: "guides/infrared-vs-traditional.jpg",
    prompt: "Educational side-by-side comparison image split down the middle: left side shows traditional Finnish wood-burning sauna with glowing hot rocks (kiuas) and visible steam, warm orange glow; right side shows modern infrared sauna with sleek red heating panels and clean contemporary design, both interiors empty with no people, informative comparison photography, professional architectural style, 16:9 aspect ratio, 2K resolution",
  },
  {
    name: "guides/sauna-safety.jpg",
    prompt: "Clean and inviting sauna interior focused on safety, prominent wooden thermometer on wall showing safe temperature, clear glass of water on bench, subtle heart rate or health monitoring symbol integrated tastefully, calming earth tones with soft green accents for healthcare feel, no people visible, professional medical wellness photography, reassuring and informative aesthetic, Scandinavian minimalist design, 16:9 aspect ratio, 2K resolution",
  },
  {
    name: "guides/sauna-mistakes.jpg",
    prompt: "Humorous editorial illustration showing common sauna mistakes in a playful artistic style: smartphone appearing to melt from heat, inappropriate gym clothes draped on bench, wall clock showing excessively long duration, perhaps a forgotten plastic water bottle warping, warm amber and honey color palette, lighthearted but informative wellness illustration, no people visible, editorial magazine style, Scandinavian aesthetic with playful elements, 16:9 aspect ratio, 2K resolution",
  },
  {
    name: "guides/sauna-etiquette.jpg",
    prompt: "Elegant authentic Finnish sauna interior showcasing proper etiquette, traditional wooden sauna bucket (kiulu) and ladle prominently displayed, bundle of birch vihta (whisk) branches resting on bench, soft gentle steam rising, warm cedar wood walls, no people visible, authentic Nordic cultural aesthetic, premium lifestyle photography, respectful and traditional atmosphere, warm amber and honey tones, 16:9 aspect ratio, ultra high quality, 2K resolution",
  },
  {
    name: "guides/world-sauna-cultures.jpg",
    prompt: "Artistic travel magazine collage showcasing world sauna cultures: Finnish lakeside smoke sauna with steam, Russian banya with traditional felt hats visible, Japanese onsen with stone bath and bamboo, Turkish hammam with ornate dome architecture, Korean jjimjilbang with jade stones, all seamlessly blended in a multicultural composition, rich diverse color palette, premium travel photography style, educational and inspiring, no people or only distant silhouettes, 16:9 aspect ratio, 2K resolution",
  },
];

async function generateImage(imageConfig) {
  console.log(`Generating: ${imageConfig.name}...`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: imageConfig.prompt }]
          }],
          generationConfig: {
            responseModalities: ["IMAGE"]
          }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error(`✗ API Error for ${imageConfig.name}:`, data.error.message);
      return false;
    }

    if (data.candidates && data.candidates[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          const outputPath = path.join("public", "images", imageConfig.name);

          // Ensure directory exists
          const dir = path.dirname(outputPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          fs.writeFileSync(outputPath, buffer);
          console.log(`✓ Saved: ${outputPath}`);
          return true;
        }
      }
    }

    console.log(`✗ No image data in response for ${imageConfig.name}`);
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log("Response:", data.candidates[0].content.parts[0].text.substring(0, 300));
    }
    return false;
  } catch (error) {
    console.error(`✗ Error generating ${imageConfig.name}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("Starting image generation with Gemini 3 Pro (Nano Banana Pro)...\n");
  console.log("Generating logo with split background demonstration\n");

  const outputDir = path.join("public", "images");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const guidesDir = path.join("public", "images", "guides");
  if (!fs.existsSync(guidesDir)) {
    fs.mkdirSync(guidesDir, { recursive: true });
    console.log(`Created directory: ${guidesDir}\n`);
  }

  let successCount = 0;
  for (const imageConfig of images) {
    const success = await generateImage(imageConfig);
    if (success) successCount++;
    // Wait 3 seconds between requests to avoid rate limiting
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`\nCompleted: ${successCount}/${images.length} images generated`);
  console.log(`\nImages saved to: public/images/`);
}

main();
