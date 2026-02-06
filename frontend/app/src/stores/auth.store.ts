import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { authService } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string, phone?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login({ email, password });
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          set({ user: response.user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.message || 'Login failed. Please try again.', 
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (email: string, password: string, firstName: string, lastName: string, phone?: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register({ email, password, firstName, lastName, phone });
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          set({ user: response.user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.message || 'Registration failed. Please try again.', 
            isLoading: false 
          });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),

      setUser: (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
