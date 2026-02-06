import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Layout
import { Layout } from '@/components/layout/Layout';

// Pages
import { HomePage } from '@/pages/HomePage';
import { VehiclesPage } from '@/pages/VehiclesPage';
import { VehicleDetailsPage } from '@/pages/VehicleDetailsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { RentalHistoryPage } from '@/pages/RentalHistoryPage';
import { AdminVehiclesPage } from '@/pages/AdminVehiclesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Components
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
            </Route>

            {/* Auth Routes (without Layout) */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            {/* Protected Customer Routes */}
            <Route
              path="/rentals/history"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<RentalHistoryPage />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route
              path="/admin/vehicles"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminVehiclesPage />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
