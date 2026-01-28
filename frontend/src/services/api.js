import { useAuth } from '../hooks/useAuth';

const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const { token } = useAuth();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};

export const createResource = (endpoint, data) => 
  apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getResource = (endpoint) => 
  apiRequest(endpoint, { method: 'GET' });

export const updateResource = (endpoint, data) => 
  apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteResource = (endpoint) => 
  apiRequest(endpoint, { method: 'DELETE' });

export { API_BASE_URL };