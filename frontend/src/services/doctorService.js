import { API_BASE_URL } from './api';

export const doctorService = {
    
  getAllDoctors: async () => {
    const response = await fetch(`${API_BASE_URL}/doctors`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch doctors');
    }
    
    return data.data;
  },

  getDoctorById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch doctor');
    }
    
    return data.data;
  },

  createDoctor: async (token, doctorData) => {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create doctor');
    }
    
    return data.data;
  },

  updateDoctor: async (token, id, doctorData) => {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update doctor');
    }
    
    return data.data;
  },

  deleteDoctor: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete doctor');
    }
    
    return data;
  },

  getDoctorsByHospital: async (hospitalId) => {
    const response = await fetch(`${API_BASE_URL}/doctors?hospital=${hospitalId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch doctors by hospital');
    }
    
    return data.data;
  },

  getDoctorsBySpecialization: async (specialization) => {
    const response = await fetch(`${API_BASE_URL}/doctors?specialization=${specialization}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch doctors by specialization');
    }
    
    return data.data;
  },
};