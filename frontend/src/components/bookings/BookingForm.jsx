import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { bookingService } from '../../services/bookingService';
import { hospitalService } from '../../services/hospitalService';
import { treatmentService } from '../../services/treatmentService';
import { hospitalTreatmentService } from '../../services/hospitalTreatmentService';
import { formatDate } from '../../utils/helpers';
import { FiCalendar, FiFileText, FiDollarSign, FiClock } from 'react-icons/fi';
import LoadingSpinner from '../common/LoadingSpinner';

const BookingForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [hospitalTreatments, setHospitalTreatments] = useState([]);
  
  const [formData, setFormData] = useState({
    hospitalTreatment: '',
    preferredDate: '',
    medicalNotes: ''
  });
  
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchHospitals();
    fetchTreatments();
  }, []);

  useEffect(() => {
    if (selectedHospital && selectedTreatment) {
      fetchHospitalTreatments();
    }
  }, [selectedHospital, selectedTreatment]);

  const fetchHospitals = async () => {
    try {
      const data = await hospitalService.getAllHospitals();
      setHospitals(data);
    } catch (error) {
      console.error('Failed to fetch hospitals:', error);
    }
  };

  const fetchTreatments = async () => {
    try {
      const data = await treatmentService.getAllTreatments();
      setTreatments(data);
    } catch (error) {
      console.error('Failed to fetch treatments:', error);
    }
  };

  const fetchHospitalTreatments = async () => {
    try {
      const data = await hospitalTreatmentService.getHospitalsByTreatment(selectedTreatment);
      const filtered = data.filter(ht => 
        ht.hospital._id === selectedHospital && ht.isActive
      );
      setHospitalTreatments(filtered);
      
      if (filtered.length === 1) {
        setFormData(prev => ({
          ...prev,
          hospitalTreatment: filtered[0]._id
        }));
      }
    } catch (error) {
      console.error('Failed to fetch hospital treatments:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHospitalChange = (e) => {
    const value = e.target.value;
    setSelectedHospital(value);
    setSelectedTreatment('');
    setHospitalTreatments([]);
    setFormData(prev => ({
      ...prev,
      hospitalTreatment: ''
    }));
  };

  const handleTreatmentChange = (e) => {
    const value = e.target.value;
    setSelectedTreatment(value);
    setFormData(prev => ({
      ...prev,
      hospitalTreatment: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.hospitalTreatment) {
      newErrors.hospitalTreatment = 'Please select a hospital treatment option';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      await bookingService.createBooking(token, formData);
      navigate('/bookings');
    } catch (error) {
      console.error('Failed to create booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedHospitalTreatment = () => {
    return hospitalTreatments.find(ht => ht._id === formData.hospitalTreatment);
  };

  const selectedHT = getSelectedHospitalTreatment();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <FiCalendar className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">New Booking</h2>
          <p className="text-gray-600 mt-2">Schedule your medical treatment</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hospital Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Hospital *
            </label>
            <select
              value={selectedHospital}
              onChange={handleHospitalChange}
              className="input-field"
              required
            >
              <option value="">Choose a hospital</option>
              {hospitals.map(hospital => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.name} - {hospital.city}, {hospital.country}
                </option>
              ))}
            </select>
          </div>

          {/* Treatment Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Treatment *
            </label>
            <select
              value={selectedTreatment}
              onChange={handleTreatmentChange}
              className="input-field"
              required
              disabled={!selectedHospital}
            >
              <option value="">Choose a treatment</option>
              {treatments.map(treatment => (
                <option key={treatment._id} value={treatment._id}>
                  {treatment.name} ({treatment.category})
                </option>
              ))}
            </select>
            {!selectedHospital && (
              <p className="mt-1 text-sm text-gray-500">
                Please select a hospital first
              </p>
            )}
          </div>

          {/* Hospital Treatment Options */}
          {selectedHospital && selectedTreatment && hospitalTreatments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Options *
              </label>
              <div className="space-y-3">
                {hospitalTreatments.map(ht => (
                  <div
                    key={ht._id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      formData.hospitalTreatment === ht._id
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      hospitalTreatment: ht._id
                    }))}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="hospitalTreatment"
                          value={ht._id}
                          checked={formData.hospitalTreatment === ht._id}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            ${ht.estimatedCostUSD?.min || 0} - ${ht.estimatedCostUSD?.max || 0}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="flex items-center text-sm text-gray-600">
                              <FiClock className="mr-1" />
                              {ht.duration || 'Duration not specified'}
                            </span>
                            {ht.successRate && (
                              <span className="text-sm text-gray-600">
                                Success Rate: {ht.successRate}%
                              </span>
                            )}
                          </div>
                          {ht.notes && (
                            <p className="text-sm text-gray-500 mt-2">{ht.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.hospitalTreatment && (
                <p className="mt-2 text-sm text-red-600">{errors.hospitalTreatment}</p>
              )}
            </div>
          )}

          {selectedHospital && selectedTreatment && hospitalTreatments.length === 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                No treatment options available for the selected hospital and treatment combination.
                Please select different options.
              </p>
            </div>
          )}

          {/* Selected Option Details */}
          {selectedHT && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">Selected Option</p>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FiDollarSign className="text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">
                        Cost: ${selectedHT.estimatedCostUSD?.min} - ${selectedHT.estimatedCostUSD?.max}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">
                        Duration: {selectedHT.duration || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedHT.successRate && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">
                      {selectedHT.successRate}%
                    </div>
                    <div className="text-xs text-green-600">Success Rate</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Preferred Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-gray-400" />
              </div>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="input-field pl-10"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Leave empty if you don't have a preferred date
            </p>
          </div>

          {/* Medical Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Medical Notes
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FiFileText className="text-gray-400 mt-1" />
              </div>
              <textarea
                name="medicalNotes"
                value={formData.medicalNotes}
                onChange={handleChange}
                rows={4}
                className="input-field pl-10"
                placeholder="Any additional medical information or special requirements..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.hospitalTreatment}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <LoadingSpinner size="small" />
                  <span className="ml-2">Creating Booking...</span>
                </div>
              ) : (
                'Create Booking'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;