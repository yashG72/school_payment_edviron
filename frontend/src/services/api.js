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

export const fetchTransactionsBySchool = async (schoolId) => {
  const { data } = await api.get(`/api/transactions/school/${schoolId}`);
  return data;
};

export const fetchTransactionStatus = async (orderId) => {
  const { data } = await api.get(`/api/transactions/status/${orderId}`);
  return data;
};

export const registerUser = async (credentials) => {
  const { data } = await api.post('/api/auth/register', credentials);
  return data;
};