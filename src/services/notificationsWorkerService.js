import { apiRequest } from './apiWorker';

export async function listarNotificacoes(token) {
  return apiRequest('/notificacoes', 'GET', token);
}

export async function criarNotificacaoWorker(token, payload) {
  return apiRequest('/notificacoes', 'POST', token, payload);
}

export async function atualizarNotificacaoWorker(token, id, payload) {
  return apiRequest(`/notificacoes/${id}`, 'PUT', token, payload);
}

export async function deletarNotificacaoWorker(token, id) {
  return apiRequest(`/notificacoes/${id}`, 'DELETE', token);
}
