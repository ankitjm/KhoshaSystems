import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Shield, Zap, Award } from 'lucide-react';

const highlights = [
  { icon: TrendingUp, text: "50+ products built across 7 industries", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Shield, text: "Trusted by Prestige, Unhive & more", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Zap, text: "AI-powered solutions shipping weekly", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Award, text: "15+ years of engineering expertise", color: "text-bronze-600", bg: "bg-bronze-50" },
];

export const SocialProof: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), 15000);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!started) return;

    const show = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrent(prev => (prev + 1) % highlights.length);
        }, 500);
      }, 5000);
    };

    show();
    const interval = setInterval(show, 30000);
    return () => clearInterval(interval);
  }, [started]);

  const item = highlights[current];
  const Icon = item.icon;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-20 sm:bottom-6 left-4 z-[55] max-w-xs"
        >
          <div className="bg-white border border-stone-200 rounded-lg shadow-lg p-3 flex items-center gap-3">
            <div className={`w-8 h-8 ${item.bg} rounded-full flex items-center justify-center shrink-0`}>
              <Icon size={14} className={item.color} />
            </div>
            <p className="text-stone-700 text-xs font-medium">{item.text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
