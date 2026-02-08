export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  HOSPITAL_ADMIN: 'hospitalAdmin'
};

export const BOOKING_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled'
};

export const BOOKING_STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Cancelled: 'bg-gray-100 text-gray-800'
};

export const TREATMENT_CATEGORIES = [
  'Cardiology',
  'Orthopedics',
  'Neurology',
  'Oncology',
  'Cosmetic',
  'IVF',
  'Dental',
  'General'
];

export const COUNTRIES = [
  'India',
  'USA',
  'UK',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Singapore',
  'UAE'
];

export const TOKEN_KEY = 'medibooking_token';
export const USER_KEY = 'medibooking_user';
