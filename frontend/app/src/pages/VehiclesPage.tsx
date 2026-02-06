import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Car } from 'lucide-react';
import { useVehicles } from '@/hooks/useVehicles';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { VehicleFiltersComponent } from '@/components/vehicle/VehicleFilters';
import { CustomPagination as Pagination } from '@/components/ui/custom-pagination';
import { VehicleCardSkeleton } from '@/components/ui/custom-spinner';
import { EmptyState } from '@/components/ui/empty-state';
import type { VehicleFilters, VehicleSort, PaginationParams } from '@/types';

export const VehiclesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Parse URL params
  const getFiltersFromURL = (): VehicleFilters => ({
    type: searchParams.get('type') as any || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    status: searchParams.get('status') as any || undefined,
    search: searchParams.get('search') || undefined,
  });

  const getSortFromURL = (): VehicleSort => ({
    field: (searchParams.get('sortBy') as any) || 'dailyPrice',
    direction: (searchParams.get('sortDirection') as any) || 'asc',
  });

  const getPaginationFromURL = (): PaginationParams => ({
    page: Number(searchParams.get('page')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 10,
  });

  const [filters, setFilters] = useState<VehicleFilters>(getFiltersFromURL());
  const [sort, setSort] = useState<VehicleSort>(getSortFromURL());
  const [pagination, setPagination] = useState<PaginationParams>(getPaginationFromURL());

  const { data, isLoading, error } = useVehicles(filters, sort, pagination);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.type) params.set('type', filters.type);
    if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.status) params.set('status', filters.status);
    if (filters.search) params.set('search', filters.search);
    
    params.set('sortBy', sort.field);
    params.set('sortDirection', sort.direction);
    params.set('page', pagination.page.toString());
    params.set('pageSize', pagination.pageSize.toString());
    
    setSearchParams(params, { replace: true });
  }, [filters, sort, pagination, setSearchParams]);

  const handleFiltersChange = (newFilters: VehicleFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handleSortChange = (newSort: VehicleSort) => {
    setSort(newSort);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination({ page: 1, pageSize });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Browse Our <span className="text-[#f15e2b]">Vehicles</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Find the perfect vehicle for your needs. Use the filters below to narrow down your search.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <VehicleFiltersComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
          sort={sort}
          onSortChange={handleSortChange}
        />

        {/* Results */}
        {isLoading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: pagination.pageSize }).map((_, i) => (
                <VehicleCardSkeleton key={i} />
              ))}
            </div>
          </>
        ) : error ? (
          <EmptyState
            icon={Car}
            title="Failed to load vehicles"
            description="Please try again later."
            actionLabel="Retry"
            onAction={() => window.location.reload()}
          />
        ) : data?.items.length === 0 ? (
          <EmptyState
            icon={Car}
            title="No vehicles found"
            description="Try adjusting your filters to see more results."
            actionLabel="Clear Filters"
            onAction={() => handleFiltersChange({})}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.items.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} showStatus />
              ))}
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
                pageSize={pagination.pageSize}
                onPageSizeChange={handlePageSizeChange}
                totalItems={data.totalCount}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
