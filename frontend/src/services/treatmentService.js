import { API_BASE_URL } from './api';

export const treatmentService = {
  // Get all treatments
  getAllTreatments: async () => {
    const response = await fetch(`${API_BASE_URL}/treatments`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch treatments');
    }
    
    return data.data;
  },

  // Get treatment by ID
  getTreatmentById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/treatments/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch treatment');
    }
    
    return data.data;
  },

  // Create treatment (admin only)
  createTreatment: async (token, treatmentData) => {
    const response = await fetch(`${API_BASE_URL}/treatments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(treatmentData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create treatment');
    }
    
    return data.data;
  },

  // Update treatment (admin only)
  updateTreatment: async (token, id, treatmentData) => {
    const response = await fetch(`${API_BASE_URL}/treatments/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(treatmentData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update treatment');
    }
    
    return data.data;
  },

  // Delete treatment (admin only)
  deleteTreatment: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/treatments/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete treatment');
    }
    
    return data;
  },

  // Get treatments by category
  getTreatmentsByCategory: async (category) => {
    const response = await fetch(`${API_BASE_URL}/treatments?category=${category}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch treatments by category');
    }
    
    return data.data;
  },
};