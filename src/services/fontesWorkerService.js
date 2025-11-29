import { apiRequest } from './apiWorker';

export async function listarFontes(token) {
  return apiRequest('/fontes', 'GET', token);
}

export async function criarFonteWorker(token, payload) {
  return apiRequest('/fontes', 'POST', token, payload);
}

export async function atualizarFonteWorker(token, id, payload) {
  return apiRequest(`/fontes/${id}`, 'PUT', token, payload);
}

export async function deletarFonteWorker(token, id) {
  return apiRequest(`/fontes/${id}`, 'DELETE', token);
}
