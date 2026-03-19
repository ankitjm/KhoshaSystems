import { GoogleGenAI } from "@google/genai";

export const checkApiKey = async (): Promise<boolean> => {
  const win = window as any;
  if (win.aistudio && win.aistudio.hasSelectedApiKey) {
    return await win.aistudio.hasSelectedApiKey();
  }
  return false;
};

export const requestApiKey = async (): Promise<void> => {
  const win = window as any;
  if (win.aistudio && win.aistudio.openSelectKey) {
    await win.aistudio.openSelectKey();
  }
};

const CACHE_PREFIX = 'kosha_genai_img_';

// Simple hash for cache keys
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

export const generateImage = async (prompt: string, aspectRatio: string = "16:9") => {
  const cacheKey = `${CACHE_PREFIX}${hashString(prompt + aspectRatio)}`;
  
  // 1. Check Cache (LocalStorage)
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      console.log('Serving from cache:', prompt.substring(0, 20) + '...');
      return cached;
    }
  } catch (e) {
    console.warn('Cache read error', e);
  }

  // 2. Generate
  try {
    // Create new instance to ensure latest key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: "1K"
        }
      }
    });

    let imageUrl = null;
    
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (imageUrl) {
      try {
        localStorage.setItem(cacheKey, imageUrl);
      } catch (e) {
        console.warn('Cache write failed (likely quota)', e);
      }
      return imageUrl;
    }
    
    return null;

  } catch (e) {
    console.error("GenAI Error:", e);
    // If "Requested entity was not found" or auth error, might need to reset key
    if (JSON.stringify(e).includes("not found") || JSON.stringify(e).includes("permission")) {
       // Optional: logic to force re-selection could go here
    }
    return null;
  }
};