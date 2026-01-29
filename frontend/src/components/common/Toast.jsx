import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiXCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ type = 'info', message, onClose }) => {
  const config = {
    success: {
      icon: <FiCheckCircle className="text-green-500" size={20} />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800'
    },
    error: {
      icon: <FiXCircle className="text-red-500" size={20} />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800'
    },
    warning: {
      icon: <FiAlertCircle className="text-yellow-500" size={20} />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800'
    },
    info: {
      icon: <FiInfo className="text-blue-500" size={20} />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    }
  };

  const { icon, bgColor, borderColor, textColor } = config[type];

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} border ${borderColor} rounded-lg shadow-lg p-4 max-w-md animate-slide-up`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <FiXCircle size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;