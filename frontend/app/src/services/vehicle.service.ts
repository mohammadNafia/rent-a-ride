import { apiCall, apiCallPaginated } from './api';
import type {
  Vehicle,
  VehicleTypeInfo,
  VehicleFilters,
  VehicleSort,
  PaginationParams,
  CreateVehicleRequest,
  UpdateVehiclePriceRequest,
} from '@/types';

export const vehicleService = {
  async getVehicles(
    filters: VehicleFilters = {},
    sort: VehicleSort = { field: 'dailyPrice', direction: 'asc' },
    pagination: PaginationParams = { page: 1, pageSize: 10 }
  ) {
    const params = new URLSearchParams();
    
    // Add filters
    if (filters.type) params.append('type', filters.type);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    
    // Add sort
    params.append('sortBy', sort.field);
    params.append('sortDirection', sort.direction);
    
    // Add pagination
    params.append('page', pagination.page.toString());
    params.append('pageSize', pagination.pageSize.toString());
    
    return apiCallPaginated<Vehicle>({
      method: 'GET',
      url: `/vehicles?${params.toString()}`,
    });
  },

  async getVehicleById(id: string): Promise<Vehicle> {
    return apiCall<Vehicle>({
      method: 'GET',
      url: `/vehicles/${id}`,
    });
  },

  async getVehicleTypes(): Promise<VehicleTypeInfo[]> {
    return apiCall<VehicleTypeInfo[]>({
      method: 'GET',
      url: '/vehicles/types',
    });
  },

  async getFeaturedVehicles(limit: number = 6): Promise<Vehicle[]> {
    return apiCall<Vehicle[]>({
      method: 'GET',
      url: `/vehicles/featured?limit=${limit}`,
    });
  },

  // Admin methods
  async createVehicle(data: CreateVehicleRequest): Promise<Vehicle> {
    return apiCall<Vehicle>({
      method: 'POST',
      url: '/vehicles',
      data,
    });
  },

  async updateVehiclePrice(id: string, data: UpdateVehiclePriceRequest): Promise<Vehicle> {
    return apiCall<Vehicle>({
      method: 'PUT',
      url: `/vehicles/${id}/price`,
      data,
    });
  },

  async deleteVehicle(id: string): Promise<void> {
    return apiCall<void>({
      method: 'DELETE',
      url: `/vehicles/${id}`,
    });
  },
};
