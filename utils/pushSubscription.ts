const API_BASE = 'https://www.khoshasystems.com/api';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export async function registerPushSubscription(): Promise<boolean> {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;

    const reg = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;

    // Check if already subscribed
    let subscription = await reg.pushManager.getSubscription();

    if (!subscription) {
      const res = await fetch(`${API_BASE}/push/vapid-key`);
      const { publicKey } = await res.json();
      subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
    }

    // Always send to server (upsert handles duplicates)
    await fetch(`${API_BASE}/push/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription: subscription.toJSON(), userAgent: navigator.userAgent }),
    });

    localStorage.setItem('khosha_push_prompted', 'true');
    return true;
  } catch (err) {
    console.error('Push subscription error:', err);
    return false;
  }
}

/**
 * If notification permission is already granted but we haven't registered
 * the subscription with our server yet, do it silently.
 */
export async function ensurePushSubscription(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
  if (Notification.permission !== 'granted') return;
  // Already synced in this browser session
  if (sessionStorage.getItem('khosha_push_synced')) return;

  await registerPushSubscription();
  sessionStorage.setItem('khosha_push_synced', 'true');
}
