import { apiRequest } from './apiWorker';
import {
  loadConversas,
  criarConversa as criarConversaSupabase,
  deletarConversa as deletarConversaSupabase,
  loadMensagens,
  inserirMensagem,
} from './chatService';

const USE_SUPABASE_DIRECT = import.meta.env.VITE_USE_SUPABASE_DIRECT === '1';
const DEMO_USER_ID = import.meta.env.VITE_DEMO_USER_ID || 'demo-user';

export async function listarConversas(token) {
  if (USE_SUPABASE_DIRECT) {
    return loadConversas(DEMO_USER_ID);
  }
  return apiRequest('/chat/conversas', 'GET', token);
}

export async function criarConversaWorker(token, payload) {
  if (USE_SUPABASE_DIRECT) {
    return criarConversaSupabase(DEMO_USER_ID, payload.title, payload.preview);
  }
  return apiRequest('/chat/conversas', 'POST', token, payload);
}

export async function deletarConversaWorker(token, id) {
  if (USE_SUPABASE_DIRECT) {
    return deletarConversaSupabase(id, DEMO_USER_ID);
  }
  return apiRequest(`/chat/conversas/${id}`, 'DELETE', token);
}

export async function listarMensagens(token, conversaId) {
  if (USE_SUPABASE_DIRECT) {
    return loadMensagens(conversaId, DEMO_USER_ID);
  }
  return apiRequest(`/chat/mensagens?conversa_id=${encodeURIComponent(conversaId)}`, 'GET', token);
}

export async function criarMensagemWorker(token, conversaId, payload) {
  if (USE_SUPABASE_DIRECT) {
    return inserirMensagem(conversaId, DEMO_USER_ID, payload);
  }
  return apiRequest(`/chat/mensagens?conversa_id=${encodeURIComponent(conversaId)}`, 'POST', token, payload);
}
