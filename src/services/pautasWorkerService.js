import { apiRequest } from './apiWorker';
import {
  loadPautas,
  criarPauta as criarPautaSupabase,
  atualizarPauta as atualizarPautaSupabase,
  deletarPauta as deletarPautaSupabase,
} from './pautasService';

const USE_SUPABASE_DIRECT = import.meta.env.VITE_USE_SUPABASE_DIRECT === '1';
const DEMO_USER_ID = import.meta.env.VITE_DEMO_USER_ID || 'demo-user';

export async function listarPautas(token) {
  if (USE_SUPABASE_DIRECT) {
    return loadPautas(DEMO_USER_ID);
  }
  return apiRequest('/pautas', 'GET', token);
}

export async function criarPautaWorker(token, payload) {
  if (USE_SUPABASE_DIRECT) {
    return criarPautaSupabase(DEMO_USER_ID, payload);
  }
  return apiRequest('/pautas', 'POST', token, payload);
}

export async function atualizarPautaWorker(token, id, payload) {
  if (USE_SUPABASE_DIRECT) {
    return atualizarPautaSupabase(id, DEMO_USER_ID, payload);
  }
  return apiRequest(`/pautas/${id}`, 'PUT', token, payload);
}

export async function deletarPautaWorker(token, id) {
  if (USE_SUPABASE_DIRECT) {
    return deletarPautaSupabase(id, DEMO_USER_ID);
  }
  return apiRequest(`/pautas/${id}`, 'DELETE', token);
}
