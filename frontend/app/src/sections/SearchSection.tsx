import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { VehicleType } from '@/types';

const vehicleTypes: VehicleType[] = ['Economy', 'Compact', 'Midsize', 'Fullsize', 'Luxury', 'SUV', 'Van', 'Truck'];

export const SearchSection = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    type: '',
    location: '',
    pickupDate: '',
    returnDate: '',
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.type) params.append('type', searchData.type);
    if (searchData.location) params.append('location', searchData.location);
    
    navigate(`/vehicles?${params.toString()}`);
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <section className="relative z-20 -mt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Find Your Vehicle</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Vehicle Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#f15e2b]" />
                Vehicle Type
              </label>
              <Select
                value={searchData.type}
                onValueChange={(value) => setSearchData({ ...searchData, type: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#f15e2b]" />
                Pick-up Location
              </label>
              <Select
                value={searchData.location}
                onValueChange={(value) => setSearchData({ ...searchData, location: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="airport">Airport</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="north">North Branch</SelectItem>
                  <SelectItem value="south">South Branch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pickup Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#f15e2b]" />
                Pick-up Date
              </label>
              <input
                type="date"
                min={minDate}
                value={searchData.pickupDate}
                onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f15e2b] focus:border-transparent"
              />
            </div>

            {/* Return Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#f15e2b]" />
                Return Date
              </label>
              <input
                type="date"
                min={searchData.pickupDate || minDate}
                value={searchData.returnDate}
                onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f15e2b] focus:border-transparent"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <Button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-[#f15e2b] hover:bg-[#d14e1f] text-white font-semibold px-12 py-6"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Vehicles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
