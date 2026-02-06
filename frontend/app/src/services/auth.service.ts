import { apiCall } from './api';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiCall<AuthResponse>({
      method: 'POST',
      url: '/auth/login',
      data,
    });
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiCall<AuthResponse>({
      method: 'POST',
      url: '/auth/register',
      data,
    });
  },

  async getCurrentUser(): Promise<User> {
    return apiCall<User>({
      method: 'GET',
      url: '/auth/me',
    });
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'Admin';
  },
};
