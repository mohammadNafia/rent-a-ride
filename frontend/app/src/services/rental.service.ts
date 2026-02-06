import { apiCall, apiCallPaginated } from './api';
import type { Rental, CreateRentalRequest, PaginationParams, RentalAmenity } from '@/types';

export const rentalService = {
  async getMyRentals(pagination: PaginationParams = { page: 1, pageSize: 10 }) {
    const params = new URLSearchParams();
    params.append('page', pagination.page.toString());
    params.append('pageSize', pagination.pageSize.toString());
    
    return apiCallPaginated<Rental>({
      method: 'GET',
      url: `/rentals/my-history?${params.toString()}`,
    });
  },

  async getRentalById(id: string): Promise<Rental> {
    return apiCall<Rental>({
      method: 'GET',
      url: `/rentals/${id}`,
    });
  },

  async createRental(data: CreateRentalRequest): Promise<Rental> {
    return apiCall<Rental>({
      method: 'POST',
      url: '/rentals',
      data,
    });
  },

  async cancelRental(id: string): Promise<Rental> {
    return apiCall<Rental>({
      method: 'PUT',
      url: `/rentals/${id}/cancel`,
    });
  },

  async getAmenities(): Promise<RentalAmenity[]> {
    return apiCall<RentalAmenity[]>({
      method: 'GET',
      url: '/rentals/amenities',
    });
  },

  // Admin methods
  async getAllRentals(pagination: PaginationParams = { page: 1, pageSize: 10 }) {
    const params = new URLSearchParams();
    params.append('page', pagination.page.toString());
    params.append('pageSize', pagination.pageSize.toString());
    
    return apiCallPaginated<Rental>({
      method: 'GET',
      url: `/rentals?${params.toString()}`,
    });
  },

  async updateRentalStatus(id: string, status: string): Promise<Rental> {
    return apiCall<Rental>({
      method: 'PUT',
      url: `/rentals/${id}/status`,
      data: { status },
    });
  },
};
