import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BookingCard from '../components/bookings/BookingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { bookingService } from '../services/bookingService';
import { formatDate } from '../utils/helpers';
import { 
  FiCalendar, 
  FiPlus, 
  FiFilter, 
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiXCircle
} from 'react-icons/fi';

const Bookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyBookings(token);
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.hospitalTreatment?.treatment?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.hospitalTreatment?.hospital?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    
    if (statusFilter) {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingService.cancelBooking(token, bookingId);
      toast.success('Booking cancelled successfully');
      fetchBookings(); 
    } catch (error) {
      toast.error('Failed to cancel booking');
      console.error('Failed to cancel booking:', error);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
  };

  const getStatusStats = () => {
    const stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'Pending').length,
      approved: bookings.filter(b => b.status === 'Approved').length,
      cancelled: bookings.filter(b => b.status === 'Cancelled' || b.status === 'Rejected').length
    };
    return stats;
  };

  const statusStats = getStatusStats();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">
            Manage and track your medical treatment bookings
          </p>
        </div>
        <Link
          to="/bookings/create"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          <FiPlus className="mr-2" />
          New Booking
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{statusStats.total}</p>
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
              <p className="text-2xl font-bold text-gray-900">{statusStats.pending}</p>
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
              <p className="text-2xl font-bold text-gray-900">{statusStats.approved}</p>
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
              <p className="text-2xl font-bold text-gray-900">{statusStats.cancelled}</p>
              <p className="text-gray-600 text-sm">Cancelled</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <FiXCircle className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Bookings
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search by treatment or hospital..."
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Active Filters
            </label>
            <div className="flex items-center space-x-2">
              {(searchTerm || statusFilter) && (
                <>
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {statusFilter && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      statusFilter === 'Approved' ? 'bg-green-100 text-green-800' :
                      statusFilter === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {statusFilter}
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear all
                  </button>
                </>
              )}
              {!searchTerm && !statusFilter && (
                <span className="text-gray-500 text-sm">No filters applied</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FiCalendar className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-600 mb-6">
            You haven't made any bookings yet. Start your healthcare journey today.
          </p>
          <Link
            to="/bookings/create"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            <FiPlus className="mr-2" />
            Book Your First Treatment
          </Link>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FiSearch className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map(booking => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleCancelBooking}
            />
          ))}
        </div>
      )}

      {/* Booking Tips */}
      {bookings.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Booking Tips</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <FiCheckCircle className="mt-1 mr-2 flex-shrink-0" />
              <span>Pending bookings can be cancelled anytime before approval</span>
            </li>
            <li className="flex items-start">
              <FiCheckCircle className="mt-1 mr-2 flex-shrink-0" />
              <span>Approved bookings require hospital confirmation for changes</span>
            </li>
            <li className="flex items-start">
              <FiCheckCircle className="mt-1 mr-2 flex-shrink-0" />
              <span>Contact hospital directly for emergency changes or updates</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Bookings;