import { apiRequest } from './apiWorker';

export async function listarConversas(token) {
  return apiRequest('/chat/conversas', 'GET', token);
}

export async function criarConversaWorker(token, payload) {
  return apiRequest('/chat/conversas', 'POST', token, payload);
}

export async function deletarConversaWorker(token, id) {
  return apiRequest(`/chat/conversas/${id}`, 'DELETE', token);
}

export async function listarMensagens(token, conversaId) {
  return apiRequest(`/chat/mensagens?conversa_id=${encodeURIComponent(conversaId)}`, 'GET', token);
}

export async function criarMensagemWorker(token, conversaId, payload) {
  return apiRequest(`/chat/mensagens?conversa_id=${encodeURIComponent(conversaId)}`, 'POST', token, payload);
}
