import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { registerPushSubscription, ensurePushSubscription } from '../utils/pushSubscription';

const PUSH_KEY = 'khosha_push_prompted';

export const PushPrompt: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If already granted, silently ensure subscription is registered with server
    ensurePushSubscription();

    // Only show prompt if not already prompted and notifications are supported
    if (localStorage.getItem(PUSH_KEY)) return;
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
    if (Notification.permission === 'granted' || Notification.permission === 'denied') return;

    const timer = setTimeout(() => setVisible(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const requestPermission = async () => {
    localStorage.setItem(PUSH_KEY, 'true');
    setVisible(false);
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await registerPushSubscription();
      }
    } catch (err) {
      console.error('Push permission error:', err);
    }
  };

  const dismiss = () => {
    localStorage.setItem(PUSH_KEY, 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed top-12 sm:top-14 right-4 z-[55] max-w-sm"
        >
          <div className="bg-white border border-stone-200 rounded-lg shadow-lg p-4 flex items-start gap-3">
            <div className="w-9 h-9 bg-bronze-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Bell size={16} className="text-bronze-600" />
            </div>
            <div className="flex-1">
              <p className="text-stone-800 text-sm font-medium mb-1">Stay Updated</p>
              <p className="text-stone-500 text-xs mb-3">
                Get notified about new products, insights, and special offers from Khoshà Systems.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={requestPermission}
                  className="px-3 py-1.5 bg-bronze-600 text-white text-xs font-medium rounded hover:bg-bronze-500 transition-colors"
                >
                  Allow
                </button>
                <button
                  onClick={dismiss}
                  className="px-3 py-1.5 border border-stone-200 text-stone-500 text-xs font-medium rounded hover:text-stone-700 transition-colors"
                >
                  Not Now
                </button>
              </div>
            </div>
            <button onClick={dismiss} className="text-stone-400 hover:text-stone-600 transition-colors">
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
