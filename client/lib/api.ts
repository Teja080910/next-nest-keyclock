import axios from 'axios';
import { getToken } from '@/lib/keycloak';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get the token before the request is sent
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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