import { useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

// Site-wide click tracking for phone taps, WhatsApp clicks, and "demo" CTAs.
// Uses event delegation so every current and future link is covered without
// instrumenting each call site individually.
export const useCtaTracking = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';

      if (href.startsWith('tel:')) {
        trackEvent('phone_tap', { event_category: 'contact', link_url: href });
        return;
      }

      if (href.includes('wa.me')) {
        trackEvent('whatsapp_click', { event_category: 'contact', link_url: href });
        return;
      }

      const label = (link.textContent || '').trim().toLowerCase();
      if (label.includes('demo')) {
        trackEvent('demo_request_click', { event_category: 'lead_generation', link_label: label, link_url: href });
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);
};
