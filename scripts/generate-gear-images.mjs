import * as fs from "node:fs";
import * as path from "node:path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Please set GEMINI_API_KEY environment variable");
  process.exit(1);
}

const categories = [
  {
    name: "gear/essentials.jpg",
    prompt: "Elegant sauna accessories still life, wooden bucket and ladle with steam rising, brass thermometer, natural sauna stones arranged on cedar wood surface, warm amber lighting, product photography style, minimalist Scandinavian aesthetic, soft shadows, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/comfort.jpg",
    prompt: "Luxurious sauna comfort items, wool felt sauna hat, curved cedar wood backrest and headrest, soft linen towels folded neatly, warm wood tones, spa product photography, minimalist composition, warm lighting, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/aromatherapy.jpg",
    prompt: "Sauna aromatherapy collection, glass essential oil bottles with eucalyptus and birch branches, fresh birch vihta whisk, droplets of water on leaves, natural wood background, soft diffused lighting, spa aesthetic, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/cold-therapy.jpg",
    prompt: "Modern cold plunge tub in minimalist setting, ice cubes floating on crystal clear water, steam rising from contrast, stainless steel and wood materials, clean Scandinavian design, cool blue tones with warm wood accents, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/tracking.jpg",
    prompt: "Health tracking devices and wearables on wooden surface, smart ring, fitness watch, digital thermometer with app display, modern tech meets traditional sauna aesthetics, clean product photography, warm lighting, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/recovery.jpg",
    prompt: "Recovery and wellness tools, massage gun, foam roller, compression boots, arranged on natural wood and linen, spa and fitness aesthetic, soft shadows, professional product photography, neutral tones, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/red-light.jpg",
    prompt: "Red light therapy panel glowing warmly in dim room, therapeutic red wavelengths, modern sleek design, wellness technology aesthetic, dramatic lighting with red glow, minimalist background, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/infrared.jpg",
    prompt: "Infrared sauna blanket elegantly draped on modern daybed, soft ambient lighting, wellness spa interior, cozy and luxurious atmosphere, neutral tones with warm accents, lifestyle product photography, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/portable-saunas.jpg",
    prompt: "Portable tent sauna in modern home setting, steam visible, wooden stool inside, clean minimalist interior, wellness lifestyle photography, warm inviting atmosphere, natural light, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/barrel-saunas.jpg",
    prompt: "Beautiful cedar barrel sauna in natural outdoor setting, morning light, steam escaping from chimney, Scandinavian forest backdrop, architectural photography style, warm wood tones, peaceful atmosphere, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/heaters.jpg",
    prompt: "Premium electric sauna heater with glowing stones, modern Finnish design, stainless steel and natural stones, steam rising, dramatic lighting, product photography, industrial elegance, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/tech.jpg",
    prompt: "Sauna technology and audio, waterproof Bluetooth speaker, LED lighting strips, smart controls, modern tech accessories on cedar wood background, warm ambient lighting, product photography, no people, 16:9 aspect ratio"
  },
  {
    name: "gear/maintenance.jpg",
    prompt: "Sauna care and maintenance products, natural wood oil in glass bottle, soft cleaning brush, cedar wood samples, maintenance tools, clean organized composition, professional product photography, neutral tones, no people, 16:9 aspect ratio"
  }
];

async function generateImage(imageConfig) {
  const outputPath = path.join("public", "images", imageConfig.name);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${imageConfig.name} (already exists)`);
    return true;
  }

  console.log(`🎨 Generating: ${imageConfig.name}...`);

  try {
    // Use Imagen 4 API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instances: [{
            prompt: imageConfig.prompt
          }],
          parameters: {
            sampleCount: 1,
            aspectRatio: "16:9"
          }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error(`❌ API Error for ${imageConfig.name}:`, data.error.message);
      return false;
    }

    // Imagen returns predictions array with bytesBase64Encoded
    if (data.predictions && data.predictions[0]?.bytesBase64Encoded) {
      const imageData = data.predictions[0].bytesBase64Encoded;
      const buffer = Buffer.from(imageData, "base64");

      // Ensure directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(outputPath, buffer);
      console.log(`✅ Saved: ${outputPath}`);
      return true;
    }

    console.log(`❌ No image data in response for ${imageConfig.name}`);
    console.log("Response:", JSON.stringify(data).substring(0, 500));
    return false;
  } catch (error) {
    console.error(`❌ Error generating ${imageConfig.name}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("🔥 Generating gear category images with Imagen 4...\n");

  const gearDir = path.join("public", "images", "gear");
  if (!fs.existsSync(gearDir)) {
    fs.mkdirSync(gearDir, { recursive: true });
    console.log(`Created directory: ${gearDir}\n`);
  }

  let successCount = 0;
  for (const imageConfig of categories) {
    const success = await generateImage(imageConfig);
    if (success) successCount++;
    // Wait 2 seconds between requests to avoid rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n✨ Completed: ${successCount}/${categories.length} images generated`);
}

main();
