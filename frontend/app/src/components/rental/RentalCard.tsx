import { useNavigate } from 'react-router-dom';
import { Calendar, Car } from 'lucide-react';
import { RentalStatusBadge } from '@/components/ui/custom-badge';
import { Button } from '@/components/ui/button';
import type { Rental } from '@/types';
import { formatCurrency, formatDate, calculateDaysBetween } from '@/utils/formatters';

interface RentalCardProps {
  rental: Rental;
  onCancel?: (id: string) => void;
  isCancelling?: boolean;
}

export const RentalCard = ({ rental, onCancel, isCancelling }: RentalCardProps) => {
  const navigate = useNavigate();
  
  const days = calculateDaysBetween(rental.startDate, rental.endDate);
  const primaryImage = rental.vehicle.images?.find(img => img.isPrimary)?.url || 
                       rental.vehicle.images?.[0]?.url || 
                       '/placeholder-vehicle.jpg';

  const canCancel = ['Pending', 'Confirmed'].includes(rental.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Vehicle Image */}
        <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
          <img
            src={primaryImage}
            alt={`${rental.vehicle.make} ${rental.vehicle.model}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            {/* Vehicle Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <RentalStatusBadge status={rental.status} />
                <span className="text-sm text-gray-500">#{rental.id.slice(0, 8)}</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900">
                {rental.vehicle.make} {rental.vehicle.model}
              </h3>
              <p className="text-sm text-gray-500">{rental.vehicle.year} • {rental.vehicle.type}</p>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-2xl font-bold text-[#f15e2b]">
                {formatCurrency(rental.totalPrice)}
              </p>
              <p className="text-sm text-gray-500">{days} days</p>
            </div>
          </div>

          {/* Dates */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-[#f15e2b]" />
              <span className="text-gray-600">Pick-up:</span>
              <span className="font-medium">{formatDate(rental.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-[#f15e2b]" />
              <span className="text-gray-600">Return:</span>
              <span className="font-medium">{formatDate(rental.endDate)}</span>
            </div>
          </div>

          {/* Amenities */}
          {rental.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {rental.amenities.map((amenity) => (
                <span
                  key={amenity.id}
                  className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                >
                  {amenity.name}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/vehicles/${rental.vehicleId}`)}
            >
              <Car className="w-4 h-4 mr-2" />
              View Vehicle
            </Button>
            
            {canCancel && onCancel && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(rental.id)}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
