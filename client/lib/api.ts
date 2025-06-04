import { getToken } from '@/lib/keycloak';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, val] = cookie.split('=');
    acc[key] = decodeURIComponent(val);
    return acc;
  }, {} as Record<string, string>);

  const token = cookies['access_token'];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const getNote = async (id: string) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: {
  userId?: string;
  title: string;
  content: string;
  category?: string;
}) => {
  const response = await api.post('/notes', data);
  return response.data;
};

export const updateNote = async (
  id: string,
  data: {
    title?: string;
    content?: string;
    category?: string;
  }
) => {
  const response = await api.patch(`/notes/${id}`, data);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

export default api;