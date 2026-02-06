import { useState } from 'react';
import { History } from 'lucide-react';
import { useMyRentals, useCancelRental } from '@/hooks/useRentals';
import { RentalCard } from '@/components/rental/RentalCard';
import { CustomPagination as Pagination } from '@/components/ui/custom-pagination';
import { LoadingSpinner } from '@/components/ui/custom-spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { toast } from 'sonner';

export const RentalHistoryPage = () => {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const { data, isLoading, error } = useMyRentals(pagination);
  const cancelRental = useCancelRental();

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this rental?')) return;
    
    try {
      await cancelRental.mutateAsync(id);
      toast.success('Rental cancelled successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel rental');
    }
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
            My <span className="text-[#f15e2b]">Rental History</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            View and manage all your past and upcoming rentals.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="xl" className="text-[#f15e2b]" />
          </div>
        ) : error ? (
          <EmptyState
            icon={History}
            title="Failed to load rentals"
            description="Please try again later."
            actionLabel="Retry"
            onAction={() => window.location.reload()}
          />
        ) : data?.items.length === 0 ? (
          <EmptyState
            icon={History}
            title="No rentals yet"
            description="You haven't made any rentals yet. Start browsing our fleet!"
            actionLabel="Browse Vehicles"
            onAction={() => window.location.href = '/vehicles'}
          />
        ) : (
          <>
            <div className="space-y-4">
              {data?.items.map((rental) => (
                <RentalCard
                  key={rental.id}
                  rental={rental}
                  onCancel={handleCancel}
                  isCancelling={cancelRental.isPending}
                />
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
