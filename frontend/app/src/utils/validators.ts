export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  return { valid: true };
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

export const isValidDateRange = (startDate: string, endDate: string): { valid: boolean; message?: string } => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  if (start < now) {
    return { valid: false, message: 'Start date cannot be in the past' };
  }
  
  if (end <= start) {
    return { valid: false, message: 'End date must be after start date' };
  }
  
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  
  if (end > maxDate) {
    return { valid: false, message: 'Booking cannot exceed 6 months' };
  }
  
  return { valid: true };
};
