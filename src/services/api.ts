import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export interface ContactPayload {
  name: string;
  contact: string;
  project_type: string;
  description: string;
  budget?: string;
}

export interface ApplyPayload {
  name: string;
  contact: string;
  skills: string;
  experience: string;
  portfolio?: string;
  reason: string;
}

export const submitContact = (data: ContactPayload) =>
  api.post('/contact', data);

export const submitApply = (data: ApplyPayload) =>
  api.post('/apply', data);

export default api;
