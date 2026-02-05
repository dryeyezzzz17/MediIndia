import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiStar, FiCheckCircle } from 'react-icons/fi';

const HospitalCard = ({ hospital, showActions = false, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${hospital.name}?`)) {
      onDelete && onDelete(hospital._id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{hospital.name}</h3>
              {hospital.accreditation && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <FiCheckCircle className="mr-1" size={12} />
                  {hospital.accreditation}
                </span>
              )}
            </div>
            
            {/* Location */}
            <div className="flex items-center text-gray-600 mb-3">
              <FiMapPin className="mr-2 text-gray-400" />
              <span>
                {hospital.city}, {hospital.country || 'India'}
              </span>
            </div>

            {/* Description */}
            {hospital.description && (
              <p className="text-gray-700 mb-4 line-clamp-2">
                {hospital.description}
              </p>
            )}

            {/* Contact Info */}
            <div className="space-y-2">
              {hospital.contactEmail && (
                <div className="flex items-center text-gray-600">
                  <FiMail className="mr-2 text-gray-400" size={16} />
                  <a 
                    href={`mailto:${hospital.contactEmail}`}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {hospital.contactEmail}
                  </a>
                </div>
              )}
              
              {hospital.contactPhone && (
                <div className="flex items-center text-gray-600">
                  <FiPhone className="mr-2 text-gray-400" size={16} />
                  <a 
                    href={`tel:${hospital.contactPhone}`}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {hospital.contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="ml-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              hospital.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {hospital.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to={`/hospitals/${hospital._id}`}
              className="text-primary hover:text-blue-600 font-medium text-sm"
            >
              View Details
            </Link>
            <Link
              to={`/hospitals/${hospital._id}/treatments`}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              View Treatments
            </Link>
          </div>

          {showActions && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit && onEdit(hospital)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;