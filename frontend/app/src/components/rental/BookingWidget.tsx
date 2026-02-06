import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { Vehicle, RentalAmenity } from '@/types';
import { formatCurrency, calculateDaysBetween } from '@/utils/formatters';
import { isValidDateRange } from '@/utils/validators';
import { toast } from 'sonner';

interface BookingWidgetProps {
  vehicle: Vehicle;
  amenities: RentalAmenity[];
  onSubmit: (data: { startDate: string; endDate: string; amenityIds: string[] }) => void;
  isLoading?: boolean;
}

export const BookingWidget = ({ vehicle, amenities, onSubmit, isLoading }: BookingWidgetProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const minDate = new Date().toISOString().split('T')[0];

  const days = startDate && endDate ? calculateDaysBetween(startDate, endDate) : 0;
  const vehicleTotal = days * vehicle.dailyPrice;
  const amenitiesTotal = selectedAmenities.reduce((sum, id) => {
    const amenity = amenities.find(a => a.id === id);
    return sum + (amenity?.price || 0) * days;
  }, 0);
  const totalPrice = vehicleTotal + amenitiesTotal;

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      toast.error('Please select both pick-up and return dates');
      return;
    }

    const dateValidation = isValidDateRange(startDate, endDate);
    if (!dateValidation.valid) {
      toast.error(dateValidation.message);
      return;
    }

    onSubmit({
      startDate,
      endDate,
      amenityIds: selectedAmenities,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold mb-6">Book This Vehicle</h3>

      {/* Price Display */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[#f15e2b]">
            {formatCurrency(vehicle.dailyPrice)}
          </span>
          <span className="text-gray-500">/day</span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="startDate" className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#f15e2b]" />
            Pick-up Date
          </Label>
          <input
            type="date"
            id="startDate"
            min={minDate}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f15e2b] focus:border-transparent"
          />
        </div>

        <div>
          <Label htmlFor="endDate" className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#f15e2b]" />
            Return Date
          </Label>
          <input
            type="date"
            id="endDate"
            min={startDate || minDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f15e2b] focus:border-transparent"
          />
        </div>
      </div>

      {/* Amenities */}
      {amenities.length > 0 && (
        <div className="mb-6">
          <Label className="mb-3 block">Optional Add-ons</Label>
          <div className="space-y-3">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onCheckedChange={() => handleAmenityToggle(amenity.id)}
                  />
                  <Label htmlFor={amenity.id} className="font-normal cursor-pointer">
                    {amenity.name}
                  </Label>
                </div>
                <span className="text-sm font-medium text-[#f15e2b]">
                  +{formatCurrency(amenity.price)}/day
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      {days > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span>{days} days × {formatCurrency(vehicle.dailyPrice)}</span>
            <span>{formatCurrency(vehicleTotal)}</span>
          </div>
          {amenitiesTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span>Add-ons</span>
              <span>{formatCurrency(amenitiesTotal)}</span>
            </div>
          )}
          <div className="pt-2 border-t flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-[#f15e2b]">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || vehicle.status !== 'Available'}
        className="w-full bg-[#f15e2b] hover:bg-[#d14e1f] text-white font-semibold py-6"
      >
        {isLoading ? (
          'Processing...'
        ) : vehicle.status === 'Available' ? (
          'Book Now'
        ) : (
          'Currently Unavailable'
        )}
      </Button>

      <p className="mt-4 text-xs text-gray-500 text-center">
        Free cancellation up to 24 hours before pick-up
      </p>
    </div>
  );
};
