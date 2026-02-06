import { useVehicleTypes } from '@/hooks/useVehicles';
import { VehicleTypeCard } from '@/components/vehicle/VehicleTypeCard';
import { VehicleCardSkeleton } from '@/components/ui/custom-spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Car } from 'lucide-react';

export const VehicleTypesSection = () => {
  const { data: vehicleTypes, isLoading, error } = useVehicleTypes();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#f15e2b]">Fleet</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide selection of vehicles. From economy to luxury, we have the perfect car for every occasion.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <VehicleCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            icon={Car}
            title="Failed to load vehicle types"
            description="Please try again later."
          />
        ) : vehicleTypes && vehicleTypes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicleTypes.map((typeInfo) => (
              <VehicleTypeCard key={typeInfo.type} typeInfo={typeInfo} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Car}
            title="No vehicle types available"
            description="Check back later for our fleet updates."
          />
        )}
      </div>
    </section>
  );
};
