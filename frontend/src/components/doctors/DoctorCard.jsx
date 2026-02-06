import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMapPin, FiStar, FiBriefcase, FiCheckCircle } from 'react-icons/fi';

const DoctorCard = ({ doctor, showActions = false, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
      onDelete && onDelete(doctor._id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Doctor Avatar */}
          <div className="flex-shrink-0">
            {doctor.profileImage ? (
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                {doctor.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Dr. {doctor.name}</h3>
                <p className="text-primary font-medium">{doctor.specialization}</p>
                
                {doctor.experience && (
                  <div className="flex items-center text-gray-600 mt-1">
                    <FiBriefcase className="mr-1" size={14} />
                    <span className="text-sm">{doctor.experience} years experience</span>
                  </div>
                )}

                {doctor.hospital && (
                  <div className="flex items-center text-gray-600 mt-1">
                    <FiMapPin className="mr-1" size={14} />
                    <span className="text-sm">{doctor.hospital.name}</span>
                    {doctor.hospital.city && (
                      <span className="ml-1 text-gray-500">• {doctor.hospital.city}</span>
                    )}
                  </div>
                )}

                {/* Specialized Treatments */}
                {doctor.treatments && doctor.treatments.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Specializations:</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.treatments.slice(0, 3).map(treatment => (
                        <span key={treatment._id} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {treatment.name}
                        </span>
                      ))}
                      {doctor.treatments.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{doctor.treatments.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                doctor.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <FiCheckCircle className="mr-1" size={12} />
                {doctor.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex items-center space-x-2 mt-4">
                <button
                  onClick={() => onEdit && onEdit(doctor)}
                  className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                >
                  <FiUser className="mr-1" size={14} />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* View Profile Link */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            to={`/doctors/${doctor._id}`}
            className="text-primary hover:text-blue-600 font-medium text-sm flex items-center"
          >
            View Full Profile →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;