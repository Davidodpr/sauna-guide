import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Please set GEMINI_API_KEY environment variable");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

const images = [
  {
    name: "hero-sauna.png",
    prompt: "A luxurious Finnish sauna interior with warm cedar wood walls and benches, gentle steam rising in the air, soft amber and copper lighting creating an atmospheric warm glow, traditional wooden sauna bucket and ladle visible, no people, professional spa photography style, warm color palette with honey and wood tones, photorealistic, high quality",
  },
  {
    name: "contrast-therapy.png",
    prompt: "Artistic visualization of contrast therapy wellness concept, showing interplay between warm sauna elements like wooden textures and amber glow on one side, and cool refreshing elements like ice crystals and blue tones on the other, abstract artistic style, premium wellness aesthetic, warm copper and cool blue color palette",
  },
  {
    name: "newsletter-sauna.png",
    prompt: "A serene Finnish lakeside sauna at golden hour dusk, traditional wooden sauna building by calm water, warm sunset colors reflecting on lake, birch trees in background, cozy inviting atmosphere, professional landscape photography, warm amber and copper color palette, no people",
  },
];

async function generateImage(prompt, filename) {
  console.log(`Generating: ${filename}...`);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: ["image", "text"],
      },
    });

    const response = await model.generateContent(prompt);
    const result = response.response;

    for (const part of result.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        const outputPath = path.join("public/images", filename);
        fs.writeFileSync(outputPath, buffer);
        console.log(`Saved: ${outputPath}`);
        return true;
      }
    }

    console.log(`No image generated for ${filename}`);
    return false;
  } catch (error) {
    console.error(`Error generating ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("Starting image generation with Gemini...\n");

  for (const img of images) {
    await generateImage(img.prompt, img.name);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log("\nDone!");
}

main();
