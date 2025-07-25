import { apiFetch } from '@/services/api';

// Buscar todos os eventos do usuário autenticado
export async function fetchEvents() {
  return apiFetch('/api/calendar/events');
}

// Criar um novo evento
export async function createEvent(event) {
  return apiFetch('/api/calendar/events', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: { 'Content-Type': 'application/json' }
  });
}

// Atualizar um evento existente
export async function updateEvent(id, event) {
  return apiFetch(`/api/calendar/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: { 'Content-Type': 'application/json' }
  });
}

// Remover evento
export async function deleteEvent(id) {
  return apiFetch(`/api/calendar/events/${id}`, {
    method: 'DELETE'
  });
}