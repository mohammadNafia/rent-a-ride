import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFeaturedVehicles } from '@/hooks/useVehicles';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { VehicleCardSkeleton } from '@/components/ui/custom-spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Car } from 'lucide-react';

export const FeaturedVehiclesSection = () => {
  const navigate = useNavigate();
  const { data: vehicles, isLoading, error } = useFeaturedVehicles(4);

  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured <span className="text-[#f15e2b]">Vehicles</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl">
              Handpicked premium vehicles at unbeatable prices. Book your favorite today.
            </p>
          </div>
          <Button
            onClick={() => navigate('/vehicles')}
            variant="outline"
            className="mt-4 sm:mt-0 border-white text-white hover:bg-white hover:text-black"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <VehicleCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            icon={Car}
            title="Failed to load featured vehicles"
            description="Please try again later."
          />
        ) : vehicles && vehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Car}
            title="No featured vehicles available"
            description="Check back later for our featured selection."
          />
        )}
      </div>
    </section>
  );
};
