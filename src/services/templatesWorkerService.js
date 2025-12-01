import { apiRequest } from './apiWorker';

export async function listarTemplates(token) {
  return apiRequest('/templates', 'GET', token);
}

export async function criarTemplateWorker(token, payload) {
  return apiRequest('/templates', 'POST', token, payload);
}

export async function atualizarTemplateWorker(token, id, payload) {
  return apiRequest(`/templates/${id}`, 'PUT', token, payload);
}

export async function deletarTemplateWorker(token, id) {
  return apiRequest(`/templates/${id}`, 'DELETE', token);
}
