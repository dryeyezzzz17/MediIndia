import React from 'react';
import { 
  FiCheckCircle, 
  FiClock, 
  FiXCircle, 
  FiAlertCircle,
  FiPieChart
} from 'react-icons/fi';

const BookingStatusChart = ({ stats }) => {
  const statusData = stats || {
    pending: 0,
    approved: 0,
    cancelled: 0,
    rejected: 0
  };

  const total = Object.values(statusData).reduce((sum, value) => sum + value, 0) || 1;

  const statusConfig = {
    pending: {
      label: 'Pending',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      icon: <FiClock className="text-yellow-500" />
    },
    approved: {
      label: 'Approved',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-100',
      icon: <FiCheckCircle className="text-green-500" />
    },
    cancelled: {
      label: 'Cancelled',
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-100',
      icon: <FiXCircle className="text-red-500" />
    },
    rejected: {
      label: 'Rejected',
      color: 'bg-gray-500',
      textColor: 'text-gray-700',
      bgColor: 'bg-gray-100',
      icon: <FiAlertCircle className="text-gray-500" />
    }
  };

  // Calculate percentages for pie chart
  const getStatusPercentage = (count) => {
    return total > 0 ? (count / total) * 100 : 0;
  };

 
  const generatePieChart = () => {
    if (total === 0) {
      return (
        <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No data</span>
        </div>
      );
    }

    let cumulativePercent = 0;
    const radius = 64;
    const centerX = 64;
    const centerY = 64;
    
    return (
      <svg width="128" height="128" viewBox="0 0 128 128" className="mx-auto">
        {Object.entries(statusData).map(([status, count], index) => {
          if (count === 0) return null;
          
          const percentage = getStatusPercentage(count);
          const config = statusConfig[status];
          
          // Calculate arc for pie segment
          const startAngle = cumulativePercent * 3.6; 
          const endAngle = (cumulativePercent + percentage) * 3.6;
          
          // Convert to radians
          const startRad = (startAngle - 90) * (Math.PI / 180);
          const endRad = (endAngle - 90) * (Math.PI / 180);
          
          // Calculate start and end points
          const startX = centerX + radius * Math.cos(startRad);
          const startY = centerY + radius * Math.sin(startRad);
          const endX = centerX + radius * Math.cos(endRad);
          const endY = centerY + radius * Math.sin(endRad);
          
          // Large arc flag
          const largeArcFlag = percentage > 50 ? 1 : 0;
          
          // Create path data
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${startX} ${startY}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            'Z'
          ].join(' ');
          
          cumulativePercent += percentage;
          
          return (
            <path
              key={status}
              d={pathData}
              fill={config.color.replace('bg-', '')}
              className="stroke-white stroke-2"
            />
          );
        })}
        
        {/* Center circle */}
        <circle cx="64" cy="64" r="32" fill="white" />
        <text x="64" y="64" textAnchor="middle" dy=".3em" className="text-lg font-bold">
          {total}
        </text>
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FiPieChart className="text-primary text-xl mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Booking Status Distribution</h3>
        </div>
        <span className="text-sm text-gray-500">Total: {total}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="flex items-center justify-center">
          {generatePieChart()}
        </div>

        {/* Status Breakdown */}
        <div className="space-y-4">
          {Object.entries(statusData).map(([status, count]) => {
            const config = statusConfig[status];
            const percentage = getStatusPercentage(count);
            
            return (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {config.icon}
                    <span className={`font-medium ${config.textColor}`}>
                      {config.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{count}</span>
                    <span className="text-gray-500 text-sm ml-2">({percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${config.color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}

          {/* Summary */}
          {total > 0 && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-700">
                    {Math.round((statusData.approved / total) * 100)}%
                  </p>
                  <p className="text-sm text-blue-600">Approval Rate</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-700">
                    {Math.round((statusData.pending / total) * 100)}%
                  </p>
                  <p className="text-sm text-yellow-600">Pending Rate</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${config.color} mr-2`}></div>
            <span className="text-sm text-gray-600">{config.label}</span>
            <span className="ml-auto text-sm font-medium text-gray-900">
              {statusData[status] || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStatusChart;