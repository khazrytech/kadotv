const RAW_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const API_BASE = RAW_BACKEND_URL.replace(/\/+$/, '').endsWith('/api')
  ? RAW_BACKEND_URL.replace(/\/+$/, '')
  : `${RAW_BACKEND_URL.replace(/\/+$/, '')}/api`;

const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  get: async (endpoint: string) => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { ...getAuthHeaders() },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  post: async (endpoint: string, data: any) => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  put: async (endpoint: string, data: any) => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  delete: async (endpoint: string) => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};

export const fetchMedia = (page = 1, limit = 20, type?: string, category?: string) =>
  api.get(`/media?page=${page}&limit=${limit}${type ? `&type=${type}` : ''}${category ? `&category=${category}` : ''}`);

export const fetchMediaById = (id: string) => api.get(`/media/${id}`);

export const register = (data: { email: string; password: string; name: string }) =>
  api.post('/auth/register', data);

export const login = (data: { email: string; password: string }) => api.post('/auth/login', data);

export const getProfile = () => api.get('/auth/me');