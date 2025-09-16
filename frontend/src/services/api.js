import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  const { data } = await api.post('/api/auth/login', credentials);
  localStorage.setItem('token', data.token);
  return data;
};

export const fetchTransactions = async (params = {}) => {
  const { data } = await api.get('/api/transactions', { params });
  return data;
};