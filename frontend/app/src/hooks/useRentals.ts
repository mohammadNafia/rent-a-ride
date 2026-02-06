import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rentalService } from '@/services/rental.service';
import type { PaginationParams, CreateRentalRequest } from '@/types';

const RENTALS_KEY = 'rentals';
const MY_RENTALS_KEY = 'myRentals';
const AMENITIES_KEY = 'amenities';

export const useMyRentals = (pagination: PaginationParams = { page: 1, pageSize: 10 }) => {
  return useQuery({
    queryKey: [MY_RENTALS_KEY, pagination],
    queryFn: () => rentalService.getMyRentals(pagination),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useRental = (id: string) => {
  return useQuery({
    queryKey: [RENTALS_KEY, id],
    queryFn: () => rentalService.getRentalById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useAmenities = () => {
  return useQuery({
    queryKey: [AMENITIES_KEY],
    queryFn: () => rentalService.getAmenities(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateRental = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateRentalRequest) => rentalService.createRental(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MY_RENTALS_KEY] });
    },
  });
};

export const useCancelRental = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => rentalService.cancelRental(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MY_RENTALS_KEY] });
    },
  });
};
