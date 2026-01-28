import { format } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return 'N/A';
  return format(new Date(date), 'dd MMM yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  return format(new Date(date), 'dd MMM yyyy, hh:mm a');
};

export const formatCurrency = (amount) => {
  if (!amount) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPriceRange = (min, max) => {
  if (!min || !max) return 'Price not available';
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const hasRole = (user, roles) => {
  if (!user || !user.role) return false;
  return roles.includes(user.role);
};

//category color
export const getCategoryColor = (category) => {
  const colors = {
    Cardiology: 'bg-red-100 text-red-800',
    Orthopedics: 'bg-blue-100 text-blue-800',
    Neurology: 'bg-purple-100 text-purple-800',
    Oncology: 'bg-pink-100 text-pink-800',
    Cosmetic: 'bg-yellow-100 text-yellow-800',
    IVF: 'bg-green-100 text-green-800',
    Dental: 'bg-cyan-100 text-cyan-800',
    General: 'bg-gray-100 text-gray-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};