import * as fs from "node:fs";
import * as path from "node:path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Please set GEMINI_API_KEY environment variable");
  process.exit(1);
}

const images = [
  {
    name: "guides/sauna-sacred-space.jpg",
    prompt: "Traditional Finnish sauna interior with soft natural light streaming through small window, authentic wooden sauna bucket and ladle prominently displayed, single candle flame flickering, peaceful ritual atmosphere with gentle steam, warm cedar wood walls with visible grain, no people visible, meditative and spiritual ambiance, professional spa photography, warm amber and honey tones, Scandinavian minimalist aesthetic, 16:9 aspect ratio",
  },
];

async function generateImage(imageConfig) {
  console.log(`\nGenerating: ${imageConfig.name}...`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: imageConfig.prompt }]
          }]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error(`  ✗ API Error:`, data.error.message);
      return false;
    }

    if (data.candidates && data.candidates[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          const outputPath = path.join("public", "images", imageConfig.name);

          const dir = path.dirname(outputPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          fs.writeFileSync(outputPath, buffer);
          const sizeKB = (buffer.length / 1024).toFixed(1);
          console.log(`  ✓ Saved: ${outputPath} (${sizeKB} KB)`);
          return true;
        }
      }
    }

    console.log(`  ✗ No image in response`);
    console.log(`  Response:`, JSON.stringify(data).substring(0, 300));
    return false;
  } catch (error) {
    console.error(`  ✗ Error:`, error.message);
    return false;
  }
}

async function main() {
  console.log("🔥 Generating guide images with Nano Banana (gemini-2.5-flash-image)\n");

  const guidesDir = path.join("public", "images", "guides");
  if (!fs.existsSync(guidesDir)) {
    fs.mkdirSync(guidesDir, { recursive: true });
  }

  let successCount = 0;
  for (const imageConfig of images) {
    const success = await generateImage(imageConfig);
    if (success) successCount++;
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`\n✅ Completed: ${successCount}/${images.length} images generated`);
}

main();
