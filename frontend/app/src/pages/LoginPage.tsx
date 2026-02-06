import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Car className="w-8 h-8 text-[#f15e2b]" />
            <span className="text-2xl font-bold tracking-tight">
              RENT<span className="text-[#f15e2b]">-A-</span>RIDE
            </span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">
                Sign in to your account to manage your rentals
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
