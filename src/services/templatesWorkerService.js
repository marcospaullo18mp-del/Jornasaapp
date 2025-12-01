import { apiRequest } from './apiWorker';
import {
  loadTemplates,
  criarTemplate as criarTemplateSupabase,
  atualizarTemplate as atualizarTemplateSupabase,
  deletarTemplate as deletarTemplateSupabase,
} from './templatesService';

const USE_SUPABASE_DIRECT = import.meta.env.VITE_USE_SUPABASE_DIRECT === '1';
const DEMO_USER_ID = import.meta.env.VITE_DEMO_USER_ID || 'demo-user';

export async function listarTemplates(token) {
  if (USE_SUPABASE_DIRECT) {
    return loadTemplates(DEMO_USER_ID);
  }
  return apiRequest('/templates', 'GET', token);
}

export async function criarTemplateWorker(token, payload) {
  if (USE_SUPABASE_DIRECT) {
    return criarTemplateSupabase(DEMO_USER_ID, payload);
  }
  return apiRequest('/templates', 'POST', token, payload);
}

export async function atualizarTemplateWorker(token, id, payload) {
  if (USE_SUPABASE_DIRECT) {
    return atualizarTemplateSupabase(id, DEMO_USER_ID, payload);
  }
  return apiRequest(`/templates/${id}`, 'PUT', token, payload);
}

export async function deletarTemplateWorker(token, id) {
  if (USE_SUPABASE_DIRECT) {
    return deletarTemplateSupabase(id, DEMO_USER_ID);
  }
  return apiRequest(`/templates/${id}`, 'DELETE', token);
}
