// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'Customer' | 'Admin';
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Vehicle Types
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  type: VehicleType;
  dailyPrice: number;
  status: VehicleStatus;
  description?: string;
  features: string[];
  images: VehicleImage[];
  createdAt: string;
  updatedAt: string;
}

export interface VehicleImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export type VehicleType = 
  | 'Economy' 
  | 'Compact' 
  | 'Midsize' 
  | 'Fullsize' 
  | 'Luxury' 
  | 'SUV' 
  | 'Van' 
  | 'Truck';

export type VehicleStatus = 'Available' | 'Rented' | 'Maintenance' | 'Unavailable';

export interface VehicleTypeInfo {
  type: VehicleType;
  name: string;
  description: string;
  imageUrl: string;
  vehicleCount: number;
  startingPrice: number;
}

export interface CreateVehicleRequest {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  type: VehicleType;
  dailyPrice: number;
  description?: string;
  features: string[];
}

export interface UpdateVehiclePriceRequest {
  dailyPrice: number;
}

// Rental Types
export interface Rental {
  id: string;
  vehicleId: string;
  vehicle: Vehicle;
  customerId: string;
  customer: User;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: RentalStatus;
  amenities: RentalAmenity[];
  createdAt: string;
  updatedAt: string;
}

export type RentalStatus = 'Pending' | 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';

export interface RentalAmenity {
  id: string;
  name: string;
  price: number;
}

export interface CreateRentalRequest {
  vehicleId: string;
  startDate: string;
  endDate: string;
  amenityIds: string[];
}

// Filter Types
export interface VehicleFilters {
  type?: VehicleType;
  minPrice?: number;
  maxPrice?: number;
  status?: VehicleStatus;
  search?: string;
}

export interface VehicleSort {
  field: 'dailyPrice' | 'year' | 'make' | 'createdAt';
  direction: 'asc' | 'desc';
}

// Pagination Types
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// UI Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
