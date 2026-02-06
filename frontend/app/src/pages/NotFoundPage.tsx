import { useNavigate } from 'react-router-dom';
import { Car, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-[#f15e2b]/10 rounded-full flex items-center justify-center mx-auto">
            <Car className="w-16 h-16 text-[#f15e2b]" />
          </div>
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on the road.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="bg-[#f15e2b] hover:bg-[#d14e1f] flex items-center justify-center"
          >
            <Car className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
