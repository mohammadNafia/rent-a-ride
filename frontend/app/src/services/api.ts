import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle 401 Unauthorized
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
      
      // Return structured error
      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        errors: data?.errors || [],
      });
    }
    
    return Promise.reject({
      status: 0,
      message: 'Network error. Please check your connection.',
      errors: [],
    });
  }
);

// Helper function to unwrap ApiResponse
export async function apiCall<T>(
  config: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<ApiResponse<T>> = await apiClient(config);
  
  if (!response.data.success) {
    throw new Error(response.data.message || 'Request failed');
  }
  
  return response.data.data;
}

// Helper function for paginated requests
export async function apiCallPaginated<T>(
  config: AxiosRequestConfig
) {
  const response: AxiosResponse<ApiResponse<import('@/types').PaginatedResponse<T>>> = await apiClient(config);
  
  if (!response.data.success) {
    throw new Error(response.data.message || 'Request failed');
  }
  
  return response.data.data;
}

export default apiClient;
