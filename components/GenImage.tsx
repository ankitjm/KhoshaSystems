import React, { useState, useEffect } from 'react';
import { generateImage, checkApiKey, requestApiKey } from '../utils/genai';
import { Sparkles, Lock, RefreshCw } from 'lucide-react';

interface GenImageProps {
  prompt: string;
  aspectRatio?: string;
  className?: string;
  alt: string;
  fallbackSrc?: string;
  triggerLabel?: string;
}

export const GenImage: React.FC<GenImageProps> = ({
  prompt,
  aspectRatio = "16:9",
  className = "",
  alt,
  fallbackSrc,
  triggerLabel = "Generate Visual"
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const checkKeyStatus = async () => {
    const authorized = await checkApiKey();
    setHasKey(authorized);
    if (authorized && !imageUrl) {
      loadVisual();
    }
  };

  const handleAuth = async () => {
    await requestApiKey();
    setTimeout(checkKeyStatus, 1000);
  };

  const loadVisual = async () => {
    setLoading(true);
    setError(false);
    const url = await generateImage(prompt, aspectRatio);
    if (url) {
      setImageUrl(url);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        className={`w-full h-full object-cover animate-fade-in ${className}`}
      />
    );
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-stone-100 border border-stone-200 overflow-hidden group rounded-lg ${className}`}>
      <div className="absolute inset-0 blueprint-grid opacity-20" />

      <div className="relative z-10 text-center p-6">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
             <RefreshCw className="text-bronze-500 animate-spin" size={22} />
             <span className="text-[11px] sm:text-xs text-bronze-600 font-mono tracking-widest uppercase">Generating...</span>
          </div>
        ) : !hasKey ? (
          <button
            onClick={handleAuth}
            className="group/btn flex flex-col items-center gap-3 hover:scale-105 transition-transform"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center border border-stone-200 group-hover/btn:border-bronze-400 group-hover/btn:text-bronze-600 transition-colors text-stone-500">
              <Lock size={18} />
            </div>
            <span className="text-[11px] sm:text-xs text-stone-500 font-mono tracking-widest uppercase group-hover/btn:text-stone-700 transition-colors">
              {triggerLabel}
            </span>
            <span className="text-[10px] text-stone-500">(Requires API Key)</span>
          </button>
        ) : error ? (
           <div className="flex flex-col items-center gap-2">
             <span className="text-red-500 text-xs uppercase">Generation Failed</span>
             <button onClick={loadVisual} className="text-xs text-stone-500 underline hover:text-stone-700">Retry</button>
           </div>
        ) : null}
      </div>
    </div>
  );
};
