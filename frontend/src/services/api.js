import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (d) => api.post('/users/register', d);
export const login = (d) => api.post('/users/login', d);
export const getProperties = (f) => api.get('/properties', { params: f });
export const getProperty = (id) => api.get(`/properties/${id}`);
export const createProperty = (data, files) => {
  const form = new FormData();
  Object.entries(data).forEach(([k, v]) => form.append(k, v));
  files.forEach(f => form.append('images', f));
  return api.post('/properties', form);
};