import { useState } from 'react';
import { Plus, Edit2, Trash2, Car, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVehicles, useCreateVehicle, useUpdateVehiclePrice, useDeleteVehicle } from '@/hooks/useVehicles';
import { VehicleForm } from '@/components/admin/VehicleForm';
import { PriceEditDialog } from '@/components/admin/PriceEditDialog';
import { VehicleStatusBadge } from '@/components/ui/custom-badge';
import { CustomPagination as Pagination } from '@/components/ui/custom-pagination';
import { TableSkeleton } from '@/components/ui/custom-spinner';
import { EmptyState } from '@/components/ui/empty-state';
import type { Vehicle, CreateVehicleRequest } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { toast } from 'sonner';

export const AdminVehiclesPage = () => {
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);

  const { data, isLoading, error } = useVehicles(
    { search: searchQuery || undefined },
    { field: 'createdAt', direction: 'desc' },
    pagination
  );

  const createVehicle = useCreateVehicle();
  const updatePrice = useUpdateVehiclePrice();
  const deleteVehicle = useDeleteVehicle();

  const handleCreate = async (data: CreateVehicleRequest) => {
    try {
      await createVehicle.mutateAsync(data);
      toast.success('Vehicle created successfully');
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create vehicle');
    }
  };

  const handleUpdatePrice = async (price: number) => {
    if (!editingVehicle) return;
    
    try {
      await updatePrice.mutateAsync({ id: editingVehicle.id, data: { dailyPrice: price } });
      toast.success('Price updated successfully');
      setIsPriceDialogOpen(false);
      setEditingVehicle(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update price');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    
    try {
      await deleteVehicle.mutateAsync(id);
      toast.success('Vehicle deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete vehicle');
    }
  };

  const openPriceDialog = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsPriceDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination({ page: 1, pageSize });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Admin <span className="text-[#f15e2b]">Dashboard</span>
              </h1>
              <p className="text-gray-400">
                Manage vehicles, prices, and availability.
              </p>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#f15e2b] hover:bg-[#d14e1f]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : error ? (
          <EmptyState
            icon={Car}
            title="Failed to load vehicles"
            description="Please try again later."
          />
        ) : data?.items.length === 0 ? (
          <EmptyState
            icon={Car}
            title="No vehicles found"
            description="Add your first vehicle to get started."
            actionLabel="Add Vehicle"
            onAction={() => setIsFormOpen(true)}
          />
        ) : (
          <>
            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vehicle</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Year</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price/Day</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {data?.items.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={vehicle.images?.[0]?.url || '/placeholder-vehicle.jpg'}
                              alt={`${vehicle.make} ${vehicle.model}`}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{vehicle.make} {vehicle.model}</p>
                              <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{vehicle.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{vehicle.year}</td>
                        <td className="px-6 py-4 text-sm font-medium text-[#f15e2b]">
                          {formatCurrency(vehicle.dailyPrice)}
                        </td>
                        <td className="px-6 py-4">
                          <VehicleStatusBadge status={vehicle.status} size="sm" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openPriceDialog(vehicle)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(vehicle.id)}
                              disabled={deleteVehicle.isPending}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

      {/* Vehicle Form Dialog */}
      <VehicleForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreate}
        isLoading={createVehicle.isPending}
      />

      {/* Price Edit Dialog */}
      <PriceEditDialog
        vehicle={editingVehicle}
        isOpen={isPriceDialogOpen}
        onClose={() => {
          setIsPriceDialogOpen(false);
          setEditingVehicle(null);
        }}
        onSubmit={handleUpdatePrice}
        isLoading={updatePrice.isPending}
      />
    </div>
  );
};
