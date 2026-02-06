import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, Fuel, Gauge, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVehicle } from '@/hooks/useVehicles';
import { useAmenities, useCreateRental } from '@/hooks/useRentals';
import { BookingWidget } from '@/components/rental/BookingWidget';
import { VehicleStatusBadge } from '@/components/ui/custom-badge';
import { LoadingSpinner } from '@/components/ui/custom-spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const { data: vehicle, isLoading: isLoadingVehicle, error } = useVehicle(id || '');
  const { data: amenities } = useAmenities();
  const createRental = useCreateRental();

  const handleBooking = async (data: { startDate: string; endDate: string; amenityIds: string[] }) => {
    if (!isAuthenticated) {
      toast.error('Please login to make a booking');
      navigate('/auth/login', { state: { from: `/vehicles/${id}` } });
      return;
    }

    if (!id) return;

    try {
      await createRental.mutateAsync({
        vehicleId: id,
        ...data,
      });
      toast.success('Booking created successfully!');
      navigate('/rentals/history');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    }
  };

  if (isLoadingVehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" className="text-[#f15e2b]" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <EmptyState
            icon={ArrowLeft}
            title="Vehicle not found"
            description="The vehicle you're looking for doesn't exist or has been removed."
            actionLabel="Browse Vehicles"
            onAction={() => navigate('/vehicles')}
          />
        </div>
      </div>
    );
  }

  const primaryImage = vehicle.images?.find(img => img.isPrimary)?.url || 
                       vehicle.images?.[0]?.url || 
                       '/placeholder-vehicle.jpg';

  // Mock specs
  const specs = {
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    mileage: 'Unlimited',
    doors: 4,
    airConditioning: true,
    bluetooth: true,
    gps: true,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/vehicles')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicles
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Vehicle Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src={primaryImage}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-64 sm:h-96 object-cover"
              />
            </div>

            {/* Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {vehicle.make} {vehicle.model}
                  </h1>
                  <p className="text-gray-500">{vehicle.year} • {vehicle.type}</p>
                </div>
                <VehicleStatusBadge status={vehicle.status} size="lg" />
              </div>

              {vehicle.description && (
                <p className="text-gray-600 mb-6">{vehicle.description}</p>
              )}

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-[#f15e2b]" />
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-medium">{specs.seats}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#f15e2b]" />
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-medium">{specs.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Fuel className="w-5 h-5 text-[#f15e2b]" />
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-medium">{specs.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Gauge className="w-5 h-5 text-[#f15e2b]" />
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-medium">{specs.mileage}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              {vehicle.features.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                      >
                        <Check className="w-3 h-3" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingWidget
                vehicle={vehicle}
                amenities={amenities || []}
                onSubmit={handleBooking}
                isLoading={createRental.isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
