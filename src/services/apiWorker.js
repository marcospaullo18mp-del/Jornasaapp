const BASE = import.meta.env.VITE_API_URL || 'https://jornasa-worker.jornabot.workers.dev';

export async function apiRequest(path, method = 'GET', token, body) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}
