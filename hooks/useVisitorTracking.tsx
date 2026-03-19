import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { upsertVisitor } from '../db/visitors';

const SESSION_KEY = 'khosha_session';
const CONSENT_KEY = 'khosha_cookie_consent';

const generateSessionId = () => {
  return 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
};

const getSessionId = () => {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

export const useVisitorTracking = () => {
  const location = useLocation();
  const startTime = useRef(Date.now());
  const pagesViewed = useRef<string[]>([]);
  const ipRef = useRef('unknown');
  const syncedRef = useRef(false);

  const hasConsent = () => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) return false;
      return JSON.parse(consent).analytics === true;
    } catch { return false; }
  };

  const syncToDb = useCallback(async () => {
    if (!hasConsent() || syncedRef.current) return;
    const timeOnSite = Math.floor((Date.now() - startTime.current) / 1000);
    const pages = pagesViewed.current;
    const qualified = timeOnSite >= 90 && pages.length > 1;

    await upsertVisitor({
      sessionId: getSessionId(),
      ip: ipRef.current,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      pagesViewed: pages,
      timeOnSite,
      qualified,
    });
  }, []);

  // Fetch IP once
  useEffect(() => {
    if (!hasConsent()) return;
    fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(data => { ipRef.current = data.ip; })
      .catch(() => { ipRef.current = 'unknown'; });
  }, []);

  // Track page views
  useEffect(() => {
    if (!hasConsent()) return;
    const path = location.pathname;
    if (!pagesViewed.current.includes(path)) {
      pagesViewed.current = [...pagesViewed.current, path];
    }
  }, [location.pathname]);

  // Heartbeat sync every 30s
  useEffect(() => {
    if (!hasConsent()) return;
    const interval = setInterval(() => {
      syncToDb();
    }, 30000);
    return () => clearInterval(interval);
  }, [syncToDb]);

  // Sync on page unload
  useEffect(() => {
    if (!hasConsent()) return;
    const handleUnload = () => {
      const timeOnSite = Math.floor((Date.now() - startTime.current) / 1000);
      const pages = pagesViewed.current;
      const qualified = timeOnSite >= 90 && pages.length > 1;
      const payload = JSON.stringify({
        sessionId: getSessionId(),
        ip: ipRef.current,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        pagesViewed: pages,
        timeOnSite,
        qualified,
      });
      // sendBeacon for reliable delivery on page close
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track', payload);
      }
      // Also try direct DB sync
      syncToDb();
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [syncToDb]);
};
