const API_BASE = '/api';

export const saveLead = async (data: { name: string; company: string; email: string; goal: string; source: string }) => {
  try {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return { success: json.success || false };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error };
  }
};
