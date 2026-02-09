import { API_BASE_URL } from './api';

export const hospitalTreatmentService = {
  
  getTreatmentsByHospital: async (hospitalId) => {
    const response = await fetch(`${API_BASE_URL}/hospital-treatments/hospital/${hospitalId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch treatments for hospital');
    }
    
    return data.data;
  },

  
  getHospitalsByTreatment: async (treatmentId) => {
    const response = await fetch(`${API_BASE_URL}/hospital-treatments/treatment/${treatmentId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch hospitals for treatment');
    }
    
    return data.data;
  },

  
  createHospitalTreatment: async (token, data) => {
    const response = await fetch(`${API_BASE_URL}/hospital-treatments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create hospital treatment');
    }
    
    return result.data;
  },

  
  updateHospitalTreatment: async (token, id, data) => {
    const response = await fetch(`${API_BASE_URL}/hospital-treatments/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update hospital treatment');
    }
    
    return result.data;
  },

 
  deleteHospitalTreatment: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/hospital-treatments/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete hospital treatment');
    }
    
    return result;
  },

  
  getHospitalTreatmentById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/hospital-treatments/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch hospital treatment');
    }
    
    return data.data;
  },
};