import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatsCard = ({ title, value, icon, color, change, prefix = '', suffix = '' }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">
              {prefix}{value}{suffix}
            </p>
            {change !== undefined && (
              <div className={`flex items-center ml-3 ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {change > 0 ? (
                  <FiTrendingUp className="mr-1" size={16} />
                ) : (
                  <FiTrendingDown className="mr-1" size={16} />
                )}
                <span className="text-sm font-medium">
                  {change > 0 ? '+' : ''}{change}%
                </span>
              </div>
            )}
          </div>
          
          {/* Progress Bar  */}
          {change !== undefined && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  change > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(Math.abs(change), 100)}%` }}
              ></div>
            </div>
          )}
        </div>
        
        {/* Icon Container */}
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Variants for different stat types
export const StatCard = {
  Primary: ({ title, value, icon, change }) => (
    <StatsCard
      title={title}
      value={value}
      icon={icon}
      color="bg-blue-500"
      change={change}
    />
  ),
  
  Success: ({ title, value, icon, change }) => (
    <StatsCard
      title={title}
      value={value}
      icon={icon}
      color="bg-green-500"
      change={change}
    />
  ),
  
  Warning: ({ title, value, icon, change }) => (
    <StatsCard
      title={title}
      value={value}
      icon={icon}
      color="bg-yellow-500"
      change={change}
    />
  ),
  
  Danger: ({ title, value, icon, change }) => (
    <StatsCard
      title={title}
      value={value}
      icon={icon}
      color="bg-red-500"
      change={change}
    />
  ),
  
  Info: ({ title, value, icon, change }) => (
    <StatsCard
      title={title}
      value={value}
      icon={icon}
      color="bg-purple-500"
      change={change}
    />
  ),
  
  // Custom currency format
  Currency: ({ title, value, icon, change }) => (
    <StatsCard
      title={title}
      value={value}
      icon={icon}
      color="bg-green-500"
      change={change}
      prefix="$"
    />
  ),
  
  // Custom percentage format
  Percentage: ({ title, value, icon, change }) => (
    <StatsCard
      title={title}
      value={value}
      icon={icon}
      color="bg-blue-500"
      change={change}
      suffix="%"
    />
  ),
};

export default StatsCard;