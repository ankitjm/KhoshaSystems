import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CONSENT_KEY = 'khosha_cookie_consent';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, marketing: true, date: new Date().toISOString() }));
    setVisible(false);
  };

  const essentialOnly = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, marketing: false, date: new Date().toISOString() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[70] p-4 sm:p-5"
        >
          <div className="max-w-4xl mx-auto bg-stone-900 border border-stone-700 rounded-lg p-4 sm:p-6 shadow-2xl">
            <div className="flex items-start gap-3 sm:gap-4">
              <Cookie size={20} className="text-bronze-400 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h4 className="text-white text-sm font-semibold mb-1">We use cookies</h4>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-3">
                  We use cookies and similar technologies to understand how you use our site, improve your experience,
                  and serve relevant content. By clicking "Accept All", you consent to our use of analytics and marketing cookies.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button
                    onClick={accept}
                    className="px-4 py-2 bg-bronze-600 text-white text-xs sm:text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={essentialOnly}
                    className="px-4 py-2 border border-stone-600 text-stone-400 text-xs sm:text-sm font-medium uppercase tracking-wider hover:text-white hover:border-stone-500 transition-colors rounded"
                  >
                    Essential Only
                  </button>
                </div>
              </div>
              <button onClick={essentialOnly} className="text-stone-500 hover:text-white transition-colors shrink-0" aria-label="Dismiss cookie consent">
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
