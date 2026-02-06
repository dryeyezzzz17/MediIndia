import React from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { getCategoryColor } from '../../utils/helpers';

const TreatmentCard = ({ treatment, showActions = false, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${treatment.name}?`)) {
      onDelete && onDelete(treatment._id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <h3 className="text-xl font-bold text-gray-900">{treatment.name}</h3>
              <span className={`badge ${getCategoryColor(treatment.category)}`}>
                {treatment.category}
              </span>
            </div>
            
            {/* Description */}
            {treatment.description && (
              <p className="text-gray-700 mb-4 line-clamp-3">
                {treatment.description}
              </p>
            )}

            {/* Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  treatment.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <FiCheckCircle className="mr-1" size={14} />
                  {treatment.isActive ? 'Active' : 'Inactive'}
                </span>
                
                <Link
                  to={`/treatments/${treatment._id}`}
                  className="text-primary hover:text-blue-600 text-sm font-medium"
                >
                  View Details →
                </Link>
              </div>

              {showActions && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit && onEdit(treatment)}
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
          
          <div className="ml-4 p-3 bg-primary bg-opacity-10 rounded-lg">
            <FiActivity className="text-primary text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard;