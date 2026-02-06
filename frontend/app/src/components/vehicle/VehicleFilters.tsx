import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { VehicleFilters as VehicleFiltersType, VehicleType, VehicleStatus } from '@/types';

interface VehicleFiltersProps {
  filters: VehicleFiltersType;
  onFiltersChange: (filters: VehicleFiltersType) => void;
  sort: { field: 'dailyPrice' | 'year' | 'make' | 'createdAt'; direction: 'asc' | 'desc' };
  onSortChange: (sort: { field: 'dailyPrice' | 'year' | 'make' | 'createdAt'; direction: 'asc' | 'desc' }) => void;
}

const vehicleTypes: VehicleType[] = ['Economy', 'Compact', 'Midsize', 'Fullsize', 'Luxury', 'SUV', 'Van', 'Truck'];
const vehicleStatuses: VehicleStatus[] = ['Available', 'Rented', 'Maintenance', 'Unavailable'];

export const VehicleFiltersComponent = ({
  filters,
  onFiltersChange,
  sort,
  onSortChange,
}: VehicleFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const cleared = {};
    setLocalFilters(cleared);
    onFiltersChange(cleared);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');

  const updateFilter = (key: keyof VehicleFiltersType, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      {/* Search Bar & Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by make, model..."
            value={localFilters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            onBlur={handleApplyFilters}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select
            value={`${sort.field}-${sort.direction}`}
            onValueChange={(value) => {
              const [field, direction] = value.split('-') as [any, any];
              onSortChange({ field, direction });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dailyPrice-asc">Price: Low to High</SelectItem>
              <SelectItem value="dailyPrice-desc">Price: High to Low</SelectItem>
              <SelectItem value="year-desc">Year: Newest First</SelectItem>
              <SelectItem value="year-asc">Year: Oldest First</SelectItem>
              <SelectItem value="make-asc">Make: A-Z</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-[#f15e2b] rounded-full" />
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Vehicle Type */}
          <div className="space-y-2">
            <Label>Vehicle Type</Label>
            <Select
              value={localFilters.type || 'all'}
              onValueChange={(value) => updateFilter('type', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
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

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Min Price</Label>
            <Input
              type="number"
              placeholder="0"
              value={localFilters.minPrice || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>

          <div className="space-y-2">
            <Label>Max Price</Label>
            <Input
              type="number"
              placeholder="Any"
              value={localFilters.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={localFilters.status || 'all'}
              onValueChange={(value) => updateFilter('status', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {vehicleStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-2 pt-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
            <Button
              onClick={handleApplyFilters}
              className="bg-[#f15e2b] hover:bg-[#d14e1f]"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
