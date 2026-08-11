const CONSENT_KEY = 'khosha_cookie_consent';

let analyticsLoaded = false;

export const hasAnalyticsConsent = (): boolean => {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) return false;
    return JSON.parse(consent).analytics === true;
  } catch {
    return false;
  }
};

export const loadAnalytics = () => {
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  // Google tag (gtag.js)
  const gaLoader = document.createElement('script');
  gaLoader.async = true;
  gaLoader.src = 'https://www.googletagmanager.com/gtag/js?id=G-SF5BQV7WRC';
  document.head.appendChild(gaLoader);

  const gaInit = document.createElement('script');
  gaInit.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SF5BQV7WRC');
  `;
  document.head.appendChild(gaInit);

  // PostHog Analytics
  const posthogInit = document.createElement('script');
  posthogInit.textContent = `
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group setPersonProperties resetPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_usNX8ZJpitvT4THN8HoWFpajGR23uucdRHFPeFYuH3Sy',{
      api_host:'https://us.i.posthog.com',
      person_profiles: 'identified_only'
    });
  `;
  document.head.appendChild(posthogInit);
};

export const initAnalyticsFromConsent = () => {
  if (hasAnalyticsConsent()) {
    loadAnalytics();
  }
};

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  const w = window as any;
  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, params || {});
  }
  if (w.posthog && typeof w.posthog.capture === 'function') {
    w.posthog.capture(eventName, params || {});
  }
};
