import { apiRequest } from './apiWorker';
import {
  loadFontes,
  criarFonte as criarFonteSupabase,
  atualizarFonte as atualizarFonteSupabase,
  deletarFonte as deletarFonteSupabase,
} from './fontesService';

const USE_SUPABASE_DIRECT = import.meta.env.VITE_USE_SUPABASE_DIRECT === '1';
const DEMO_USER_ID = import.meta.env.VITE_DEMO_USER_ID || 'demo-user';

export async function listarFontes(token) {
  if (USE_SUPABASE_DIRECT) {
    return loadFontes(DEMO_USER_ID);
  }
  return apiRequest('/fontes', 'GET', token);
}

export async function criarFonteWorker(token, payload) {
  if (USE_SUPABASE_DIRECT) {
    return criarFonteSupabase(DEMO_USER_ID, payload);
  }
  return apiRequest('/fontes', 'POST', token, payload);
}

export async function atualizarFonteWorker(token, id, payload) {
  if (USE_SUPABASE_DIRECT) {
    return atualizarFonteSupabase(id, DEMO_USER_ID, payload);
  }
  return apiRequest(`/fontes/${id}`, 'PUT', token, payload);
}

export async function deletarFonteWorker(token, id) {
  if (USE_SUPABASE_DIRECT) {
    return deletarFonteSupabase(id, DEMO_USER_ID);
  }
  return apiRequest(`/fontes/${id}`, 'DELETE', token);
}
