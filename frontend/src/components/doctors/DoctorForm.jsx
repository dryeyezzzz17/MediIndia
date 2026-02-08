import React, { useEffect } from 'react';
import { FiUser, FiBriefcase, FiMapPin, FiLink, FiCheckCircle } from 'react-icons/fi';

const DoctorForm = ({ 
  initialData = {}, 
  hospitals = [], 
  treatments = [], 
  onSubmit, 
  loading = false 
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    experience: '',
    specialization: '',
    hospital: '',
    treatments: [],
    profileImage: '',
    isActive: true,
    ...initialData
  });

  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    if (initialData._id) {
      setFormData({
        name: initialData.name || '',
        experience: initialData.experience || '',
        specialization: initialData.specialization || '',
        hospital: initialData.hospital?._id || initialData.hospital || '',
        treatments: initialData.treatments?.map(t => t._id || t) || [],
        profileImage: initialData.profileImage || '',
        isActive: initialData.isActive !== undefined ? initialData.isActive : true
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTreatmentToggle = (treatmentId) => {
    setFormData(prev => ({
      ...prev,
      treatments: prev.treatments.includes(treatmentId)
        ? prev.treatments.filter(id => id !== treatmentId)
        : [...prev.treatments, treatmentId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Doctor name is required';
    }
    
    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization is required';
    }
    
    if (!formData.hospital) {
      newErrors.hospital = 'Hospital selection is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Doctor Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.name ? 'border-red-300 focus:ring-red-500' : ''}`}
              placeholder="Enter doctor's full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialization *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiBriefcase className="text-gray-400" />
            </div>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.specialization ? 'border-red-300 focus:ring-red-500' : ''}`}
              placeholder="e.g., Cardiologist, Orthopedic Surgeon"
            />
          </div>
          {errors.specialization && (
            <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience (Years)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiBriefcase className="text-gray-400" />
            </div>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="Years of experience"
              min="0"
            />
          </div>
        </div>

        {/* Hospital */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.hospital ? 'border-red-300 focus:ring-red-500' : ''}`}
            >
              <option value="">Select Hospital</option>
              {hospitals.map(hospital => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.name} - {hospital.city}
                </option>
              ))}
            </select>
          </div>
          {errors.hospital && (
            <p className="mt-1 text-sm text-red-600">{errors.hospital}</p>
          )}
        </div>

        {/* Profile Image URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLink className="text-gray-400" />
            </div>
            <input
              type="url"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="https://example.com/doctor-profile.jpg"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to use default avatar
          </p>
        </div>
      </div>

      {/* Treatments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specialized Treatments
        </label>
        <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-4">
          {treatments.length === 0 ? (
            <p className="text-gray-500 text-sm">No treatments available. Add treatments first.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {treatments.map(treatment => (
                <label key={treatment._id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={formData.treatments.includes(treatment._id)}
                    onChange={() => handleTreatmentToggle(treatment._id)}
                    className="h-4 w-4 text-primary rounded"
                  />
                  <div>
                    <span className="text-sm text-gray-700">{treatment.name}</span>
                    <span className="text-xs text-gray-500 block">{treatment.category}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Select treatments this doctor specializes in
        </p>
      </div>

      {/* Active Status */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 flex items-center text-sm text-gray-700">
          <FiCheckCircle className="mr-1" />
          Active (visible to users)
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : initialData._id ? 'Update Doctor' : 'Create Doctor'}
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;