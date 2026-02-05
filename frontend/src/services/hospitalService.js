import { API_BASE_URL } from './api';

export const hospitalService = {
  // Get all hospitals
  getAllHospitals: async () => {
    const response = await fetch(`${API_BASE_URL}/hospitals`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch hospitals');
    }
    
    return data.data;
  },

  // Get hospital by ID
  getHospitalById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch hospital');
    }
    
    return data.data;
  },

  // Create hospital (admin only)
  createHospital: async (token, hospitalData) => {
    const response = await fetch(`${API_BASE_URL}/hospitals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospitalData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create hospital');
    }
    
    return data.data;
  },

  // Update hospital (admin only)
  updateHospital: async (token, id, hospitalData) => {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospitalData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update hospital');
    }
    
    return data.data;
  },

  // Delete hospital (admin only)
  deleteHospital: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete hospital');
    }
    
    return data;
  },

  // Search hospitals
  searchHospitals: async (query) => {
    const response = await fetch(`${API_BASE_URL}/hospitals?search=${query}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to search hospitals');
    }
    
    return data.data;
  },
};