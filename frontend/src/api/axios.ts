import axios from 'axios';
import { API_BASE_URL } from '../constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Interceptor untuk handle error secara global (opsional, tapi berguna)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bisa tambahkan logging atau penanganan error global di sini
    return Promise.reject(error);
  }
);

export default axiosInstance;
