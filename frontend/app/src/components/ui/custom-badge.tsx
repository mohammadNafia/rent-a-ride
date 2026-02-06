import { cn } from '@/lib/utils';
import type { VehicleStatus, RentalStatus } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  outline: 'bg-transparent border border-gray-300 text-gray-700',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export const CustomBadge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};

// Vehicle status badge
interface VehicleStatusBadgeProps {
  status: VehicleStatus;
  size?: 'sm' | 'md' | 'lg';
}

const vehicleStatusMap: Record<VehicleStatus, { variant: BadgeProps['variant']; label: string }> = {
  Available: { variant: 'success', label: 'Available' },
  Rented: { variant: 'warning', label: 'Rented' },
  Maintenance: { variant: 'error', label: 'Maintenance' },
  Unavailable: { variant: 'outline', label: 'Unavailable' },
};

export const VehicleStatusBadge = ({ status, size = 'md' }: VehicleStatusBadgeProps) => {
  const { variant, label } = vehicleStatusMap[status];
  return <CustomBadge variant={variant} size={size}>{label}</CustomBadge>;
};

// Rental status badge
interface RentalStatusBadgeProps {
  status: RentalStatus;
  size?: 'sm' | 'md' | 'lg';
}

const rentalStatusMap: Record<RentalStatus, { variant: BadgeProps['variant']; label: string }> = {
  Pending: { variant: 'warning', label: 'Pending' },
  Confirmed: { variant: 'info', label: 'Confirmed' },
  Active: { variant: 'success', label: 'Active' },
  Completed: { variant: 'default', label: 'Completed' },
  Cancelled: { variant: 'error', label: 'Cancelled' },
};

export const RentalStatusBadge = ({ status, size = 'md' }: RentalStatusBadgeProps) => {
  const { variant, label } = rentalStatusMap[status];
  return <CustomBadge variant={variant} size={size}>{label}</CustomBadge>;
};
