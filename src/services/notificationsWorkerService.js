import { apiRequest } from './apiWorker';

const USE_SUPABASE_DIRECT = import.meta.env.VITE_USE_SUPABASE_DIRECT === '1';
const LOCAL_KEY = 'jornasa:notificacoes:demo';

const loadLocal = () => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocal = (items) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export async function listarNotificacoes(token) {
  if (USE_SUPABASE_DIRECT) {
    return loadLocal();
  }
  return apiRequest('/notificacoes', 'GET', token);
}

export async function criarNotificacaoWorker(token, payload) {
  if (USE_SUPABASE_DIRECT) {
    const current = loadLocal();
    const created = { ...payload, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    saveLocal([created, ...current]);
    return created;
  }
  return apiRequest('/notificacoes', 'POST', token, payload);
}

export async function atualizarNotificacaoWorker(token, id, payload) {
  if (USE_SUPABASE_DIRECT) {
    const current = loadLocal();
    const updated = current.map((item) => (item.id === id ? { ...item, ...payload } : item));
    saveLocal(updated);
    return updated.find((item) => item.id === id) || null;
  }
  return apiRequest(`/notificacoes/${id}`, 'PUT', token, payload);
}

export async function deletarNotificacaoWorker(token, id) {
  if (USE_SUPABASE_DIRECT) {
    const current = loadLocal().filter((item) => item.id !== id);
    saveLocal(current);
    return;
  }
  return apiRequest(`/notificacoes/${id}`, 'DELETE', token);
}
