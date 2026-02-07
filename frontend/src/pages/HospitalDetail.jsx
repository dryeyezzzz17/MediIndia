import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { hospitalService } from '../services/hospitalService';
import { hospitalTreatmentService } from '../services/hospitalTreatmentService';
import { formatPriceRange } from '../utils/helpers';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiCheckCircle,
  FiActivity,
  FiDollarSign,
  FiClock,
  FiArrowLeft
} from 'react-icons/fi';

const HospitalDetail = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitalDetails();
  }, [id]);

  const fetchHospitalDetails = async () => {
    try {
      setLoading(true);
      const [hospitalData, treatmentsData] = await Promise.all([
        hospitalService.getHospitalById(id),
        hospitalTreatmentService.getTreatmentsByHospital(id)
      ]);
      setHospital(hospitalData);
      setTreatments(treatmentsData);
    } catch (error) {
      console.error('Failed to fetch hospital details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!hospital) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hospital not found</h2>
        <Link to="/hospitals" className="text-primary hover:text-blue-600 font-medium">
          ← Back to Hospitals
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div>
        <Link 
          to="/hospitals" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-2" />
          Back to Hospitals
        </Link>
      </div>

      {/* Hospital Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{hospital.name}</h1>
                {hospital.accreditation && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <FiCheckCircle className="mr-1" />
                    {hospital.accreditation} Accredited
                  </span>
                )}
              </div>
              
              {/* Location */}
              <div className="flex items-center text-gray-600 mb-4">
                <FiMapPin className="mr-2 text-gray-400" />
                <span className="font-medium">
                  {hospital.city}, {hospital.country || 'India'}
                </span>
              </div>

              {/* Description */}
              {hospital.description && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700">{hospital.description}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {hospital.contactPhone && (
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <FiPhone className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a 
                        href={`tel:${hospital.contactPhone}`}
                        className="font-medium text-gray-900 hover:text-primary"
                      >
                        {hospital.contactPhone}
                      </a>
                    </div>
                  </div>
                )}

                {hospital.contactEmail && (
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <FiMail className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a 
                        href={`mailto:${hospital.contactEmail}`}
                        className="font-medium text-gray-900 hover:text-primary"
                      >
                        {hospital.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Badge */}
            <div className="md:text-right">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                hospital.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {hospital.isActive ? '✅ Active' : '⏸️ Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Treatments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available Treatments</h2>
            <p className="text-gray-600 mt-1">
              {treatments.length} treatments available at this hospital
            </p>
          </div>
          <Link
            to="/bookings/create"
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Book Treatment
          </Link>
        </div>

        {treatments.length === 0 ? (
          <div className="text-center py-12">
            <FiActivity className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No treatments available</h3>
            <p className="text-gray-600">This hospital currently has no listed treatments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map(treatment => (
              <div key={treatment._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {treatment.treatment?.name}
                    </h3>
                    <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {treatment.treatment?.category}
                    </span>
                  </div>
                  {treatment.successRate && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-700">
                        {treatment.successRate}%
                      </div>
                      <div className="text-xs text-green-600">Success Rate</div>
                    </div>
                  )}
                </div>

                {/* Treatment Details */}
                <div className="space-y-3">
                  {treatment.estimatedCostUSD && (
                    <div className="flex items-center text-gray-700">
                      <FiDollarSign className="mr-2 text-gray-400" />
                      <span className="font-medium">
                        {formatPriceRange(
                          treatment.estimatedCostUSD.min,
                          treatment.estimatedCostUSD.max
                        )}
                      </span>
                    </div>
                  )}

                  {treatment.duration && (
                    <div className="flex items-center text-gray-700">
                      <FiClock className="mr-2 text-gray-400" />
                      <span>{treatment.duration}</span>
                    </div>
                  )}

                  {treatment.notes && (
                    <p className="text-sm text-gray-600 mt-3">{treatment.notes}</p>
                  )}
                </div>

                <div className="mt-6">
                  <Link
                    to={`/treatments/${treatment.treatment?._id}`}
                    className="block w-full text-center py-2 border border-primary text-primary rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
                  >
                    View Treatment Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking CTA */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to book a treatment?</h3>
        <p className="opacity-90 mb-6 max-w-2xl mx-auto">
          Get expert medical care at {hospital.name}. Compare prices, check availability, 
          and book your treatment with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/bookings/create"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
          >
            Book Now
          </Link>
          <Link
            to="/treatments"
            className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-200"
          >
            Browse All Treatments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;