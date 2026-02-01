import axios from 'axios';

// Используем переменную окружения для API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 секунд таймаут
});

// Interceptor для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    if (!error.response) {
      console.error('Network error - Backend недоступен');
    }
    return Promise.reject(error);
  }
);

export const dataService = {
  // Получить все элементы
  getAll: async () => {
    const response = await api.get('/dataitems');
    return response.data;
  },

  // Получить элемент по ID
  getById: async (id) => {
    const response = await api.get(`/dataitems/${id}`);
    return response.data;
  },

  // Получить отфильтрованные элементы
  getFiltered: async (category, isActive, searchTerm) => {
    const params = {};
    if (category) params.category = category;
    if (isActive !== null) params.isActive = isActive;
    if (searchTerm) params.searchTerm = searchTerm;

    const response = await api.get('/dataitems/filter', { params });
    return response.data;
  },

  // Создать новый элемент
  create: async (item) => {
    const response = await api.post('/dataitems', item);
    return response.data;
  },

  // Обновить элемент
  update: async (id, item) => {
    const response = await api.put(`/dataitems/${id}`, item);
    return response.data;
  },

  // Удалить элемент
  delete: async (id) => {
    await api.delete(`/dataitems/${id}`);
  },
};
