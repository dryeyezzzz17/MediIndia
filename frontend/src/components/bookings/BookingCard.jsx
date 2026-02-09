import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatCurrency, formatPriceRange } from '../../utils/helpers';
import { BOOKING_STATUS_COLORS } from '../../utils/constants';
import { 
  FiCalendar, 
  FiDollarSign, 
  FiClock, 
  FiMapPin,
  FiUser,
  FiAlertCircle
} from 'react-icons/fi';

const BookingCard = ({ booking, onCancel, isAdmin = false }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return '✅';
      case 'Rejected':
        return '❌';
      case 'Cancelled':
        return '⏹️';
      default:
        return '⏳';
    }
  };

  const handleCancel = () => {
    if (onCancel && window.confirm('Are you sure you want to cancel this booking?')) {
      onCancel(booking._id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`badge ${BOOKING_STATUS_COLORS[booking.status]}`}>
                  {getStatusIcon(booking.status)} {booking.status}
                </span>
                <span className="text-sm text-gray-500">
                  Created: {formatDate(booking.createdAt)}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {booking.hospitalTreatment?.treatment?.name}
              </h3>
              
              <div className="space-y-2">
                {/* Hospital Info */}
                <div className="flex items-center text-gray-700">
                  <FiMapPin className="mr-2 text-gray-400" />
                  <span className="font-medium">{booking.hospitalTreatment?.hospital?.name}</span>
                  <span className="mx-2">•</span>
                  <span>{booking.hospitalTreatment?.hospital?.city}</span>
                </div>

                {/* Treatment Category */}
                <div className="flex items-center text-gray-600">
                  <FiUser className="mr-2 text-gray-400" />
                  <span>Category: {booking.hospitalTreatment?.treatment?.category}</span>
                </div>

                {/* Price */}
                {booking.hospitalTreatment?.estimatedCostUSD && (
                  <div className="flex items-center text-gray-600">
                    <FiDollarSign className="mr-2 text-gray-400" />
                    <span>
                      Estimated Cost:{' '}
                      {formatPriceRange(
                        booking.hospitalTreatment.estimatedCostUSD.min,
                        booking.hospitalTreatment.estimatedCostUSD.max
                      )}
                    </span>
                  </div>
                )}

                {/* Duration */}
                {booking.hospitalTreatment?.duration && (
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-2 text-gray-400" />
                    <span>Duration: {booking.hospitalTreatment.duration}</span>
                  </div>
                )}

                {/* Preferred Date */}
                {booking.preferredDate && (
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="mr-2 text-gray-400" />
                    <span>Preferred Date: {formatDate(booking.preferredDate)}</span>
                  </div>
                )}

                {/* Medical Notes */}
                {booking.medicalNotes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start">
                      <FiAlertCircle className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{booking.medicalNotes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col space-y-3 min-w-[200px]">
          {/* User Info */}
          {isAdmin && booking.user && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-1">Patient</p>
              <p className="text-gray-900">{booking.user.name}</p>
              <p className="text-sm text-gray-600">{booking.user.email}</p>
              <p className="text-xs text-gray-500">{booking.user.country}</p>
            </div>
          )}

          {/* Success Rate */}
          {booking.hospitalTreatment?.successRate && (
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">
                {booking.hospitalTreatment.successRate}%
              </p>
              <p className="text-xs text-green-600">Success Rate</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col space-y-2">
            {booking.status === 'Pending' && !isAdmin && (
              <button
                onClick={handleCancel}
                className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
              >
                Cancel Booking
              </button>
            )}

            {isAdmin && booking.status === 'Pending' && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onCancel && onCancel(booking._id, 'Approved')}
                  className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={() => onCancel && onCancel(booking._id, 'Rejected')}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                >
                  Reject
                </button>
              </div>
            )}

            <Link
              to={`/hospitals/${booking.hospitalTreatment?.hospital?._id}`}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-center"
            >
              View Hospital
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;