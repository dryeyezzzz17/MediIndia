import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { bookingService } from '../services/bookingService';
import { formatDate } from '../utils/helpers';
import { 
  FiCalendar, 
  FiUser, 
  FiSettings, 
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight
} from 'react-icons/fi';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    cancelled: 0
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyBookings(token);
      setBookings(data.slice(0, 5)); // Show only recent 5 bookings
      
      // Calculate stats
      const stats = {
        total: data.length,
        pending: data.filter(b => b.status === 'Pending').length,
        approved: data.filter(b => b.status === 'Approved').length,
        cancelled: data.filter(b => b.status === 'Cancelled' || b.status === 'Rejected').length
      };
      setStats(stats);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <FiCheckCircle className="text-green-500" />;
      case 'Pending':
        return <FiClock className="text-yellow-500" />;
      case 'Cancelled':
      case 'Rejected':
        return <FiAlertCircle className="text-red-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user?.name}!
            </h1>
            <p className="mt-2 opacity-90">
              {user?.role === 'admin' 
                ? 'Manage your medical booking platform'
                : 'Track your medical bookings and treatments'}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FiUser className="text-xl" />
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm opacity-80 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-gray-600 text-sm">Total Bookings</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiCalendar className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-gray-600 text-sm">Pending</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FiClock className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              <p className="text-gray-600 text-sm">Approved</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCheckCircle className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              <p className="text-gray-600 text-sm">Cancelled</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <FiAlertCircle className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
              <Link 
                to="/bookings" 
                className="text-primary hover:text-blue-600 font-medium flex items-center"
              >
                View All <FiArrowRight className="ml-1" />
              </Link>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <FiCalendar className="text-gray-400 text-4xl mx-auto mb-4" />
                <p className="text-gray-600">No bookings yet</p>
                <Link 
                  to="/bookings/create" 
                  className="inline-block mt-4 text-primary hover:text-blue-600 font-medium"
                >
                  Book your first treatment →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking._id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(booking.status)}
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.hospitalTreatment?.treatment?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.hospitalTreatment?.hospital?.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(booking.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/bookings/create"
                className="flex items-center justify-between p-3 bg-primary bg-opacity-10 text-primary rounded-lg hover:bg-opacity-20 transition-colors duration-200"
              >
                <span className="font-medium">Book New Treatment</span>
                <FiArrowRight />
              </Link>
              
              <Link
                to="/profile"
                className="flex items-center justify-between p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <span className="font-medium">Update Profile</span>
                <FiSettings />
              </Link>
              
              <Link
                to="/hospitals"
                className="flex items-center justify-between p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <span className="font-medium">Browse Hospitals</span>
                <FiArrowRight />
              </Link>
              
              <Link
                to="/treatments"
                className="flex items-center justify-between p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <span className="font-medium">View Treatments</span>
                <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Country</span>
                <span className="font-medium">{user?.country || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Type</span>
                <span className="font-medium capitalize">{user?.role}</span>
              </div>
            </div>
            <Link
              to="/profile"
              className="inline-block w-full mt-4 text-center py-2 text-primary hover:text-blue-600 font-medium border border-primary rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;