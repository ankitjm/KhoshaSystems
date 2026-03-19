#!/usr/bin/env node
/**
 * Image generation script for Khoshà Systems website
 * Uses Google AI Studio (Gemini) to generate images per the visual audit
 */

const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GOOGLE_AI_KEY || 'AIzaSyBg-nNziBA-8nfOnekERHwH88bIDM44mGg';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');

const ai = new GoogleGenAI({ apiKey: API_KEY });

// All image tasks from the visual audit, ordered by priority
const IMAGE_TASKS = [
  // CRITICAL
  {
    id: 'task-34-retaileros-hero',
    filename: 'retaileros-hero-mockup.png',
    prompt: `A polished, high-fidelity hero product mockup showing a RetailerOS billing/POS dashboard inside a floating laptop frame at 3/4 angle with slight perspective. The dashboard shows: a billing/POS screen with a product list (Samsung Galaxy A55 ₹24,999, Vivo V30 ₹33,999, Oppo Reno 11 ₹29,999), IMEI scan field, GST breakdown (CGST/SGST), a sidebar with today's sales stats (₹2.4L revenue, 18 bills), and a "Scheme Applied: Samsung Cashback ₹2,000" badge. A floating phone showing the mobile inventory scanner app beside it. Dark mode UI with bronze/amber accents. Clean white/light grey background. Professional SaaS marketing quality. Indian mobile retail context. Store name "Krishna Mobiles" visible.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-1-hero-bg',
    filename: 'hero-bg.jpg',
    prompt: `Abstract architectural composition with clean geometric lines, warm stone tones and subtle bronze metallic accents. Modern Bangalore tech corridor at golden hour, shot from an elevated angle. Muted, editorial, cinematic. No people. The feeling is "engineered precision meets warmth." Photorealistic, desaturated warm palette (stone grey through cream tones), slight film grain, shallow depth of field on architectural details. Landscape orientation, suitable for full-bleed website hero background behind dark overlay text.`,
    aspectRatio: '16:9',
  },
  // HIGH
  {
    id: 'task-4-why-partner-bg',
    filename: 'why-partner-bg.jpg',
    prompt: `Close-up of high-quality architectural material — brushed concrete surface with warm lighting. Abstract, textural, minimal. Dark tones (charcoal through dark grey range), minimal contrast, matte finish, slight warmth. Dark abstract gradient mesh in bronze and charcoal tones. Very dark and subtle — a moody textural backdrop. Landscape orientation 1440x600 proportions.`,
    aspectRatio: '12:5',
  },
  {
    id: 'task-5-home-third',
    filename: 'home-workspace.jpg',
    prompt: `A clean, modern workspace detail shot — a minimal desk with a single ultrawide monitor showing a clean dashboard interface with warm wood desk surface, matte black keyboard and mouse. The vibe is "architect's studio" not "WeWork." No people. Warm, natural light from the left side. Photorealistic, muted warm tones, editorial lighting. Shot at slight angle with shallow depth of field. Stone and bronze color palette.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-9-founder-bg',
    filename: 'founder-bg.jpg',
    prompt: `An editorial-quality founder's workspace — minimal desk with a warm desk lamp, architectural drawings, and a laptop. Bangalore cityscape visible through floor-to-ceiling windows at dusk. Warm, cinematic lighting, shallow depth of field. Predominantly warm stone tones with natural wood and bronze/brass desk accents. Contemplative and focused mood. One person's domain. Think architectural magazine interior photography. No people visible.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-7-chaos-photo',
    filename: 'fragmented-ops.jpg',
    prompt: `A close-up of a messy, overwhelming legacy dashboard on a computer screen — dense spreadsheet with red/orange warning cells, conflicting data, multiple browser tabs with different SaaS tools (email, spreadsheet, chat, CRM) all half-visible and overlapping. The feeling is "this is what businesses are drowning in." Photorealistic, muted desaturated cold blue-grey tones. Shallow depth of field on the screen. Aesthetically shot chaos — beautiful photography of an ugly problem. Wide landscape format.`,
    aspectRatio: '8:3',
  },
  {
    id: 'task-8b-unified-photo',
    filename: 'unified-architecture.jpg',
    prompt: `A clean, modern unified dashboard on a monitor — everything connected and organized, green status indicators, clean graphs trending upward, a beautiful admin interface with bronze accent highlights. The visual resolution to chaos — order achieved. Warm confident tones, clear layout. If abstract: bronze and stone geometric system architecture diagram with connected nodes. Must feel like the "after" to a "before" of messy operations. Warm tones contrasting with cold/blue-grey. Wide landscape format.`,
    aspectRatio: '8:3',
  },
  {
    id: 'task-11-retaileros-card',
    filename: 'product-retaileros.png',
    prompt: `A clean product mockup of a RetailerOS POS/billing screen inside a floating tablet/laptop device frame. Dark mode dashboard showing IMEI scan field, item list with Samsung and Vivo phones, GST total in Indian Rupees, brand scheme badge "Samsung Cashback ₹2,000". Indian store context. Device-framed on stone-grey background with slight shadow, 3/4 angle perspective. The UI uses stone palette with bronze accents, clean sans-serif typography.`,
    aspectRatio: '4:3',
  },
  {
    id: 'task-11-crm-card',
    filename: 'product-crm.png',
    prompt: `A clean product mockup of a Real Estate CRM lead pipeline board (Kanban-style) inside a floating laptop device frame. Light mode UI showing lead sources (99acres, MagicBricks), columns for New Lead, Site Visit Scheduled, Negotiation, Closed. Deal value column in Indian Rupees. Clean professional UI. Device-framed on stone-grey background with slight shadow, 3/4 angle perspective. Stone palette with bronze accents.`,
    aspectRatio: '4:3',
  },
  {
    id: 'task-11-vms-card',
    filename: 'product-vms.png',
    prompt: `A clean product mockup of a Visitor Management check-in screen inside a floating tablet device frame. Modern minimal UI showing visitor name entry field, photo capture zone, host dropdown, prominent "Check In" button, and a QR code. Clean professional interface. Device-framed on stone-grey background with slight shadow, 3/4 angle perspective. Stone palette with bronze accents, clean sans-serif typography.`,
    aspectRatio: '4:3',
  },
  // MEDIUM
  {
    id: 'task-12-services-hero',
    filename: 'services-hero.jpg',
    prompt: `Abstract close-up of precision engineering — circuit board macro shot in warm bronze and stone tones, or architectural blueprints with bronze metallic ink on dark paper. The metaphor is "engineered services, not off-the-shelf." Dark, moody, textural with warm undertones. Will sit behind white text with heavy dark gradient overlay. Landscape 1440x700 proportions.`,
    aspectRatio: '2:1',
  },
  {
    id: 'task-13-services-inline',
    filename: 'services-craft.jpg',
    prompt: `A focused, intentional workspace moment — a single pair of hands on a clean mechanical keyboard with a code editor showing clean architecture diagrams visible on a monitor. No face visible. The shot composition is intimate and focused — "this is where the craft happens." Warm editorial lighting, shallow depth of field. Natural side-lighting. Muted warm palette. Stone and bronze tones.`,
    aspectRatio: '8:5',
  },
  {
    id: 'task-14-services-bg',
    filename: 'services-network.jpg',
    prompt: `Abstract network topology or constellation map — dots and lines forming an organic network pattern. Dark near-black background with bronze/gold connection lines and stone-grey nodes. A "systems thinking" visual — interconnected, intelligent, alive. Dark, abstract, geometric. Not a literal globe — something more original and artistic. Subtle glow on key nodes.`,
    aspectRatio: '16:9',
  },
  {
    id: 'task-16-work-hero',
    filename: 'work-hero.jpg',
    prompt: `An abstract mosaic or grid composition of subtle project artifacts — overlapping wireframes, code snippets, dashboard fragments, architectural diagrams. The feeling is "a body of work" as a visual collage. Dark layered editorial style. Stone-900 dominant dark background with bronze and white accent elements. Collage/montage aesthetic. Landscape format for hero background.`,
    aspectRatio: '2:1',
  },
  {
    id: 'task-17-prestige',
    filename: 'case-prestige.jpg',
    prompt: `A mockup of a Visitor Management dashboard on a tablet, composited into a premium real estate lobby environment. Marble reception area with warm downlighting, a tablet kiosk showing visitor check-in interface. Real estate industry feel — premium sales gallery or luxury apartment lobby. Photorealistic device mockup in real estate environment. Warm tones, premium feel.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-18-arrowhead',
    filename: 'case-arrowhead.jpg',
    prompt: `A laptop screen showing an enterprise operations dashboard — network status tiles, real-time metrics graphs, telecom infrastructure map overlay. Dark mode UI with green and bronze status indicators. The environment is a clean network operations center with ambient blue-cool lighting with warm monitor glow accents. Professional telecom enterprise vibe. Photorealistic.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-19-unhive',
    filename: 'case-unhive.jpg',
    prompt: `A mockup of an investment analysis dashboard on a large monitor — portfolio allocation donut chart, deal pipeline kanban, AI recommendation cards with confidence percentage scores. The vibe is "intelligent capital" — data-driven, precise, modern. Dark mode with bronze accent highlights for key metrics. Financial green for positive indicators. Clean professional fintech UI. Device frame with subtle shadow.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-20-phygital',
    filename: 'case-phygital.jpg',
    prompt: `A creative agency dashboard or marketing analytics interface on a laptop — campaign performance cards, social media metrics tiles, brand asset library grid view. Light mode, creative and professional design tool aesthetic. Clean UI with stone and bronze accents. More "creative/design" feeling — think Figma meets analytics. Device frame on clean background.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-21-philosophy-hero',
    filename: 'philosophy-hero.jpg',
    prompt: `Japanese-inspired zen architecture or a minimal concrete and wood meditation space. Clean geometric lines, deliberate emptiness, warm light filtering through geometric openings in concrete walls. Tadao Ando-inspired concrete plus warm light composition. The metaphor is "philosophy as architecture" — intentional, considered, timeless. Warm, muted, contemplative. Dark enough for white text overlay.`,
    aspectRatio: '2:1',
  },
  {
    id: 'task-24-retaileros-page-hero',
    filename: 'retaileros-page-hero.jpg',
    prompt: `An Indian mobile phone retail store shot beautifully — Samsung, Vivo, Oppo devices on clean glass display shelves, warm shop lighting, slight motion blur of activity in background. The feeling is "this is the world RetailerOS lives in" — real, Indian, aspirational. Photorealistic, warm cinematic lighting, slight desaturation. Focus on products on display. Dark enough for hero text overlay.`,
    aspectRatio: '2:1',
  },
  {
    id: 'task-25-retaileros-inline',
    filename: 'retaileros-inline.png',
    prompt: `A RetailerOS inventory management dashboard screenshot mockup — product grid showing Samsung Galaxy, Vivo, Oppo phones with stock counts, IMEI tracking, price columns in Indian Rupees. Dark mode UI with bronze accents. Clean professional SaaS interface. Device frame with subtle shadow on light background.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-26-realestate-hero',
    filename: 'realestate-page-hero.jpg',
    prompt: `A premium Indian real estate development — modern Bangalore apartment complex exterior with glass facade reflecting warm golden-hour evening light. Cranes visible in background suggesting active development. Architectural photography style, premium real estate marketing quality. Warm tones, professional. Dark enough for white hero text overlay.`,
    aspectRatio: '2:1',
  },
  {
    id: 'task-27-realestate-inline',
    filename: 'realestate-inline.png',
    prompt: `A Real Estate CRM lead pipeline dashboard mockup — Kanban board with columns (New Lead, Follow Up, Site Visit, Negotiation, Closed Won). Lead cards showing source badges (99acres, MagicBricks, Walk-in), scheduled visit dates, deal values in Indian Rupees. Light mode clean UI. Device frame on light background with subtle shadow.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-28-vms-hero',
    filename: 'vms-page-hero.jpg',
    prompt: `A modern Indian corporate lobby — polished marble reception desk, a visitor check-in tablet on a sleek stand, warm downlighting, glass and steel interior. Premium corporate or real estate sales office entrance. The tablet kiosk is visible but not the primary focus — it's part of the environment. Photorealistic, warm interior photography. Dark enough for hero text.`,
    aspectRatio: '2:1',
  },
  {
    id: 'task-29-vms-inline',
    filename: 'vms-inline.png',
    prompt: `A Visitor Management System analytics dashboard mockup — daily visitor count chart, check-in/check-out timeline, host-wise visitor breakdown, real-time visitor list with photos and timestamps. Clean professional UI in light mode with stone and bronze accents. Device frame on light background.`,
    aspectRatio: '3:2',
  },
  {
    id: 'task-30-vancouver-hero',
    filename: 'vancouver-hero.jpg',
    prompt: `Vancouver skyline at dusk from Coal Harbour or Stanley Park — North Shore mountains, harbor with reflections, glass towers catching warm orange sunset light against cool blue mountain backdrop. The image feels "premium tech company based here" not tourism brochure. Photorealistic, cinematic, warm-cool contrast. Muted enough for white text overlay with dark gradient. Landscape hero format.`,
    aspectRatio: '2:1',
  },
  {
    id: 'task-31-blog-hero',
    filename: 'blog-hero.jpg',
    prompt: `An overhead flat-lay shot of a curated workspace — open notebook with architectural sketches, a tablet showing code editor, a warm cup of chai in a ceramic cup, scattered pages from a tech magazine. Warm, editorial, Indian professional context. "Where insights are crafted." Natural lighting from top-right. Muted stone and bronze palette. Dark enough for text overlay.`,
    aspectRatio: '12:5',
  },
  {
    id: 'task-32-blog-telecom',
    filename: 'blog-telecom-retail.jpg',
    prompt: `Close-up of an Indian mobile shop counter with a billing device, colorful SIM card displays, phone accessories hanging on pegboard. Warm documentary-style photography. Real Indian telecom retail environment, authentic and aspirational. Muted warm tones.`,
    aspectRatio: '12:5',
  },
  {
    id: 'task-32-blog-realestate',
    filename: 'blog-realestate-crm.jpg',
    prompt: `Aerial view of a Bangalore apartment complex under construction — concrete structures rising with cranes visible, warm evening golden-hour light casting long shadows. Real estate development energy and progress. Photorealistic architectural photography.`,
    aspectRatio: '12:5',
  },
  {
    id: 'task-32-blog-legacy',
    filename: 'blog-legacy-modern.jpg',
    prompt: `A visual metaphor of legacy modernization: old mechanical gears and clockwork machinery on the left side transitioning smoothly into clean digital circuits and modern tech on the right. Split composition with warm-to-cool color gradient. Bronze mechanical elements fading into clean silver-blue digital patterns. Artistic and editorial.`,
    aspectRatio: '12:5',
  },
  {
    id: 'task-32-blog-ai',
    filename: 'blog-ai-integration.jpg',
    prompt: `Abstract neural network or AI visualization — bronze connection lines forming an organic network on dark charcoal background. Glowing nodes at intersections. Not the typical blue-glowing-brain cliche — sophisticated, minimal, editorial. Bronze and stone palette. Geometric and precise.`,
    aspectRatio: '12:5',
  },
  {
    id: 'task-32-blog-vancouver',
    filename: 'blog-vancouver-bangalore.jpg',
    prompt: `Split image composition: Vancouver mountains and harbor on the left connected by a subtle golden thread/line to Bangalore tech park buildings on the right. Dual-city visual showing the bridge between Canada and India. Warm golden connecting element. Cinematic photography style.`,
    aspectRatio: '12:5',
  },
  {
    id: 'task-33-contact-hero',
    filename: 'contact-hero.jpg',
    prompt: `A warm, inviting corner of a premium co-working space — comfortable seating area with a coffee table, warm pendant downlighting, Bangalore cityscape visible through floor-to-ceiling windows at dusk. The mood is "let's have a conversation" not "corporate meeting room." Warm intimate evening light. Residential-commercial crossover aesthetic. Dark enough for white text overlay.`,
    aspectRatio: '12:5',
  },
];

async function generateSingleImage(task) {
  const outputPath = path.join(OUTPUT_DIR, task.filename);

  // Skip if already generated
  if (fs.existsSync(outputPath)) {
    console.log(`  SKIP ${task.id} — already exists: ${task.filename}`);
    return true;
  }

  console.log(`  GENERATING ${task.id} (${task.aspectRatio})...`);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Generate an image: ${task.prompt}` }] },
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      }
    });

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const buffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(outputPath, buffer);
          const sizeMB = (buffer.length / 1024 / 1024).toFixed(2);
          console.log(`  OK ${task.filename} (${sizeMB} MB)`);
          return true;
        }
      }
    }

    console.log(`  WARN ${task.id} — no image data in response`);
    return false;
  } catch (err) {
    console.error(`  ERR ${task.id}:`, err.message || err);
    return false;
  }
}

async function main() {
  // Parse CLI args for subset generation
  const args = process.argv.slice(2);
  let tasks = IMAGE_TASKS;

  if (args.length > 0) {
    // Filter by task ID prefix
    tasks = IMAGE_TASKS.filter(t => args.some(a => t.id.includes(a)));
    if (tasks.length === 0) {
      console.error('No matching tasks found. Available IDs:');
      IMAGE_TASKS.forEach(t => console.error(`  ${t.id}`));
      process.exit(1);
    }
  }

  console.log(`\nKhoshà Systems — Image Generation`);
  console.log(`Tasks: ${tasks.length} | Output: ${OUTPUT_DIR}\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let success = 0;
  let fail = 0;

  for (const task of tasks) {
    const ok = await generateSingleImage(task);
    if (ok) success++;
    else fail++;

    // Small delay to avoid rate limits
    if (tasks.indexOf(task) < tasks.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log(`\nDone: ${success} generated, ${fail} failed out of ${tasks.length} tasks.`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
