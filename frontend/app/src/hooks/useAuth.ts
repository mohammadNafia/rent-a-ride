import { useAuthStore } from '@/stores/auth.store';

export const useAuth = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    register, 
    logout, 
    clearError 
  } = useAuthStore();

  const isAdmin = user?.role === 'Admin';

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    login,
    register,
    logout,
    clearError,
  };
};
