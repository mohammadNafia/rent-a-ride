import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleService } from '@/services/vehicle.service';
import type { VehicleFilters, VehicleSort, PaginationParams, CreateVehicleRequest, UpdateVehiclePriceRequest } from '@/types';

const VEHICLES_KEY = 'vehicles';
const VEHICLE_TYPES_KEY = 'vehicleTypes';
const FEATURED_VEHICLES_KEY = 'featuredVehicles';

export const useVehicles = (
  filters: VehicleFilters = {},
  sort: VehicleSort = { field: 'dailyPrice', direction: 'asc' },
  pagination: PaginationParams = { page: 1, pageSize: 10 }
) => {
  return useQuery({
    queryKey: [VEHICLES_KEY, filters, sort, pagination],
    queryFn: () => vehicleService.getVehicles(filters, sort, pagination),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useVehicle = (id: string) => {
  return useQuery({
    queryKey: [VEHICLES_KEY, id],
    queryFn: () => vehicleService.getVehicleById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useVehicleTypes = () => {
  return useQuery({
    queryKey: [VEHICLE_TYPES_KEY],
    queryFn: () => vehicleService.getVehicleTypes(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFeaturedVehicles = (limit: number = 6) => {
  return useQuery({
    queryKey: [FEATURED_VEHICLES_KEY, limit],
    queryFn: () => vehicleService.getFeaturedVehicles(limit),
    staleTime: 5 * 60 * 1000,
  });
};

// Admin mutations
export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateVehicleRequest) => vehicleService.createVehicle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VEHICLES_KEY] });
    },
  });
};

export const useUpdateVehiclePrice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVehiclePriceRequest }) => 
      vehicleService.updateVehiclePrice(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [VEHICLES_KEY] });
      queryClient.invalidateQueries({ queryKey: [VEHICLES_KEY, variables.id] });
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => vehicleService.deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VEHICLES_KEY] });
    },
  });
};
