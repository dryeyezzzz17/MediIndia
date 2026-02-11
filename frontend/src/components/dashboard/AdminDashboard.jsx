import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../services/userService';
import { formatCurrency } from '../../utils/helpers';
import { 
  FiUsers, 
  FiHome, 
  FiActivity, 
  FiCalendar,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiXCircle
} from 'react-icons/fi';
import LoadingSpinner from '../common/LoadingSpinner';

const StatsCard = ({ title, value, icon, color, change }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <FiTrendingUp className={`${change > 0 ? 'text-green-500' : 'text-red-500'} mr-1`} />
              <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change > 0 ? '+' : ''}{change}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const BookingStatusChart = ({ stats }) => {
  const total = stats?.pending + stats?.approved + stats?.cancelled || 1;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status Distribution</h3>
      
      {/* Progress Bars */}
      <div className="space-y-4">
        {/* Pending */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-yellow-700">Pending</span>
            <span>{stats?.pending || 0}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full" 
              style={{ width: `${((stats?.pending || 0) / total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Approved */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-green-700">Approved</span>
            <span>{stats?.approved || 0}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${((stats?.approved || 0) / total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Cancelled */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-red-700">Cancelled</span>
            <span>{stats?.cancelled || 0}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full" 
              style={{ width: `${((stats?.cancelled || 0) / total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Approved</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await userService.getAdminStats(token);
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your medical booking platform</p>
        </div>
        <button 
          onClick={fetchStats}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          Refresh Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={<FiUsers className="text-white text-2xl" />}
          color="bg-blue-500"
          change={12}
        />
        
        <StatsCard
          title="Active Hospitals"
          value={stats?.totalHospitals || 0}
          icon={<FiHome className="text-white text-2xl" />}
          color="bg-green-500"
          change={8}
        />
        
        <StatsCard
          title="Available Treatments"
          value={stats?.totalTreatments || 0}
          icon={<FiActivity className="text-white text-2xl" />}
          color="bg-purple-500"
          change={15}
        />
        
        <StatsCard
          title="Total Bookings"
          value={stats?.totalBookings || 0}
          icon={<FiCalendar className="text-white text-2xl" />}
          color="bg-orange-500"
          change={-5}
        />
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Status Chart */}
        <div className="lg:col-span-2">
          <BookingStatusChart stats={stats?.bookingStatus} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <FiClock className="text-blue-600 mr-3" />
                <span className="font-medium text-gray-700">Pending Bookings</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {stats?.bookingStatus?.pending || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <FiCheckCircle className="text-green-600 mr-3" />
                <span className="font-medium text-gray-700">Approved Bookings</span>
              </div>
              <span className="text-xl font-bold text-green-600">
                {stats?.bookingStatus?.approved || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <FiXCircle className="text-red-600 mr-3" />
                <span className="font-medium text-gray-700">Cancelled Bookings</span>
              </div>
              <span className="text-xl font-bold text-red-600">
                {stats?.bookingStatus?.cancelled || 0}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-2">Platform Summary</p>
            <p className="text-gray-700">
              Your platform currently has{' '}
              <span className="font-bold text-primary">{stats?.totalUsers || 0} users</span>{' '}
              across{' '}
              <span className="font-bold text-primary">{stats?.totalHospitals || 0} hospitals</span>{' '}
              with{' '}
              <span className="font-bold text-primary">{stats?.totalTreatments || 0} treatments</span>{' '}
              available.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">Recent activity will appear here</p>
          <p className="text-sm text-gray-400 mt-2">New bookings, user registrations, etc.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;