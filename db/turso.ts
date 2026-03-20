const API_BASE = '/api';

export const saveLead = async (data: { name: string; company: string; email: string; goal: string; message?: string; source: string }) => {
  try {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('Lead API error:', res.status, text);
      return { success: false, error: `Server error: ${res.status}` };
    }
    const json = await res.json();
    return { success: json.success || false };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error };
  }
};
