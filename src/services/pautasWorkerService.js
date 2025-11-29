import { apiRequest } from './apiWorker';

export async function listarPautas(token) {
  return apiRequest('/pautas', 'GET', token);
}

export async function criarPautaWorker(token, payload) {
  return apiRequest('/pautas', 'POST', token, payload);
}

export async function atualizarPautaWorker(token, id, payload) {
  return apiRequest(`/pautas/${id}`, 'PUT', token, payload);
}

export async function deletarPautaWorker(token, id) {
  return apiRequest(`/pautas/${id}`, 'DELETE', token);
}
