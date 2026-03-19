const API_BASE = 'https://www.khoshasystems.com/api';

export const upsertVisitor = async (data: {
  sessionId: string;
  ip: string;
  userAgent: string;
  referrer: string;
  pagesViewed: string[];
  timeOnSite: number;
  qualified: boolean;
}) => {
  try {
    const res = await fetch(`${API_BASE}/visitors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return { success: json.success || false };
  } catch (error) {
    console.error('Visitor upsert failed:', error);
    return { success: false, error };
  }
};
