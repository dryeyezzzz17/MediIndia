import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { treatmentService } from '../services/treatmentService';
import { hospitalTreatmentService } from '../services/hospitalTreatmentService';
import { formatPriceRange } from '../utils/helpers';
import { getCategoryColor } from '../utils/helpers';
import { 
  FiActivity, 
  FiDollarSign, 
  FiClock, 
  FiMapPin,
  FiCheckCircle,
  FiArrowLeft,
  FiStar
} from 'react-icons/fi';

const TreatmentDetail = () => {
  const { id } = useParams();
  const [treatment, setTreatment] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreatmentDetails();
  }, [id]);

  const fetchTreatmentDetails = async () => {
    try {
      setLoading(true);
      const [treatmentData, hospitalsData] = await Promise.all([
        treatmentService.getTreatmentById(id),
        hospitalTreatmentService.getHospitalsByTreatment(id)
      ]);
      setTreatment(treatmentData);
      setHospitals(hospitalsData);
    } catch (error) {
      console.error('Failed to fetch treatment details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!treatment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Treatment not found</h2>
        <Link to="/treatments" className="text-primary hover:text-blue-600 font-medium">
          ← Back to Treatments
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div>
        <Link 
          to="/treatments" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-2" />
          Back to Treatments
        </Link>
      </div>

      {/* Treatment Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{treatment.name}</h1>
                <span className={`badge ${getCategoryColor(treatment.category)}`}>
                  {treatment.category}
                </span>
              </div>
              
              {/* Description */}
              {treatment.description && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{treatment.description}</p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <FiMapPin className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{hospitals.length}</p>
                      <p className="text-sm text-gray-600">Hospitals</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <FiCheckCircle className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(hospitals.reduce((acc, h) => acc + (h.successRate || 0), 0) / hospitals.length) || 'N/A'}%
                      </p>
                      <p className="text-sm text-gray-600">Avg. Success</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <FiActivity className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {treatment.isActive ? 'Active' : 'Inactive'}
                      </p>
                      <p className="text-sm text-gray-600">Status</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg mr-3">
                      <FiStar className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">4.8</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Icon */}
            <div className="md:text-right">
              <div className="p-4 bg-primary bg-opacity-10 rounded-2xl inline-block">
                <FiActivity className="text-primary text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Hospitals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available at These Hospitals</h2>
            <p className="text-gray-600 mt-1">
              Compare prices and success rates across {hospitals.length} hospitals
            </p>
          </div>
          <Link
            to="/bookings/create"
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Book This Treatment
          </Link>
        </div>

        {hospitals.length === 0 ? (
          <div className="text-center py-12">
            <FiMapPin className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hospitals available</h3>
            <p className="text-gray-600">
              This treatment is not currently offered at any hospitals.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {hospitals.map(hospitalTreatment => (
              <div key={hospitalTreatment._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Hospital Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FiMapPin className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {hospitalTreatment.hospital?.name}
                        </h3>
                        <p className="text-gray-600">
                          {hospitalTreatment.hospital?.city}, {hospitalTreatment.hospital?.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Treatment Details */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hospitalTreatment.estimatedCostUSD && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <FiDollarSign className="text-gray-400 mr-1" />
                          <span className="font-bold text-gray-900">
                            {formatPriceRange(
                              hospitalTreatment.estimatedCostUSD.min,
                              hospitalTreatment.estimatedCostUSD.max
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Cost</p>
                      </div>
                    )}

                    {hospitalTreatment.duration && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <FiClock className="text-gray-400 mr-1" />
                          <span className="font-bold text-gray-900">
                            {hospitalTreatment.duration}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Duration</p>
                      </div>
                    )}

                    {hospitalTreatment.successRate && (
                      <div className="text-center">
                        <div className="font-bold text-green-700 text-lg">
                          {hospitalTreatment.successRate}%
                        </div>
                        <p className="text-xs text-gray-500">Success Rate</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 min-w-[200px]">
                    <Link
                      to={`/hospitals/${hospitalTreatment.hospital?._id}`}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-center"
                    >
                      View Hospital
                    </Link>
                    <Link
                      to={`/bookings/create`}
                      className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 text-center"
                    >
                      Book Here
                    </Link>
                  </div>
                </div>

                {/* Additional Notes */}
                {hospitalTreatment.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{hospitalTreatment.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Info */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to book {treatment.name}?</h3>
          <p className="opacity-90 mb-6">
            Compare prices across {hospitals.length} hospitals, check availability, 
            and book your treatment with confidence. Our platform ensures transparent 
            pricing and verified medical facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/bookings/create"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
            >
              Book Treatment Now
            </Link>
            <Link
              to="/hospitals"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-200"
            >
              Browse All Hospitals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetail;