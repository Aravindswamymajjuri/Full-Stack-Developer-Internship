import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// create axios instance
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

// intercept all requests to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      config.headers.Authorization = `Bearer ${tokenFromStorage}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// intercept responses to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired or invalid, clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// auth api calls
export const authAPI = {
  signup: (data) => apiClient.post('/auth/signup', data),
  login: (data) => apiClient.post('/auth/login', data),
};

// user api calls
export const userAPI = {
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data) => apiClient.put('/user/profile', data),
};

export default apiClient;
