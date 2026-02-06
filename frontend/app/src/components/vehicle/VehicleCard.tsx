import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Fuel, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VehicleStatusBadge } from '@/components/ui/custom-badge';
import type { Vehicle } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface VehicleCardProps {
  vehicle: Vehicle;
  showStatus?: boolean;
}

export const VehicleCard = ({ vehicle, showStatus = false }: VehicleCardProps) => {
  const navigate = useNavigate();
  
  const primaryImage = vehicle.images?.find(img => img.isPrimary)?.url || 
                       vehicle.images?.[0]?.url || 
                       '/placeholder-vehicle.jpg';

  // Mock specs (would come from backend)
  const specs = {
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    mileage: 'Unlimited',
  };

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={primaryImage}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {showStatus && (
          <div className="absolute top-3 left-3">
            <VehicleStatusBadge status={vehicle.status} />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {vehicle.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-gray-500">{vehicle.type}</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Users className="w-4 h-4 text-[#f15e2b]" />
            <span>{specs.seats} Seats</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-[#f15e2b]" />
            <span>{specs.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Fuel className="w-4 h-4 text-[#f15e2b]" />
            <span>{specs.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Gauge className="w-4 h-4 text-[#f15e2b]" />
            <span>{specs.mileage}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <span className="text-2xl font-bold text-[#f15e2b]">
              {formatCurrency(vehicle.dailyPrice)}
            </span>
            <span className="text-sm text-gray-500">/day</span>
          </div>
          <Button
            onClick={() => navigate(`/vehicles/${vehicle.id}`)}
            className="bg-black hover:bg-gray-800 text-white"
            disabled={vehicle.status !== 'Available'}
          >
            {vehicle.status === 'Available' ? 'Rent Now' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </div>
  );
};
