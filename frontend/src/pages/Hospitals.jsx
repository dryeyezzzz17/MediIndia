import React, { useState, useEffect } from 'react';
import HospitalCard from '../components/hospitals/HospitalCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { hospitalService } from '../services/hospitalService';
import { FiSearch, FiFilter, FiMapPin, FiX } from 'react-icons/fi';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [uniqueCities, setUniqueCities] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    filterHospitals();
  }, [hospitals, searchTerm, cityFilter]);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const data = await hospitalService.getAllHospitals();
      setHospitals(data);
      setFilteredHospitals(data);
      
      // Extract unique cities
      const cities = [...new Set(data.map(h => h.city))].sort();
      setUniqueCities(cities);
    } catch (error) {
      console.error('Failed to fetch hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterHospitals = () => {
    let filtered = hospitals;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.country?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply city filter
    if (cityFilter) {
      filtered = filtered.filter(hospital =>
        hospital.city.toLowerCase() === cityFilter.toLowerCase()
      );
    }

    setFilteredHospitals(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCityFilter('');
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hospitals</h1>
        <p className="text-gray-600 mt-2">
          Find and compare top hospitals for your medical needs
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Hospitals
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
                placeholder="Search by name, city, or country..."
              />
            </div>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by City
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="text-gray-400" />
              </div>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Active Filters
            </label>
            <div className="flex items-center space-x-2">
              {(searchTerm || cityFilter) && (
                <>
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      Search: {searchTerm}
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                  {cityFilter && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      City: {cityFilter}
                      <button
                        onClick={() => setCityFilter('')}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <FiX size={14} />
                      </button>
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
              {!searchTerm && !cityFilter && (
                <span className="text-gray-500 text-sm">No filters applied</span>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredHospitals.length}</span> of{' '}
            <span className="font-semibold">{hospitals.length}</span> hospitals
          </p>
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <span className="text-sm text-gray-600">Filters applied</span>
          </div>
        </div>
      </div>

      {/* Hospitals Grid */}
      {filteredHospitals.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FiSearch className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hospitals found</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map(hospital => (
            <HospitalCard key={hospital._id} hospital={hospital} />
          ))}
        </div>
      )}

      {/* Pagination Info */}
      {filteredHospitals.length > 0 && (
        <div className="text-center py-4">
          <p className="text-gray-600">
            Found {filteredHospitals.length} hospitals matching your criteria
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Click on any hospital to view detailed information and available treatments
          </p>
        </div>
      )}
    </div>
  );
};

export default Hospitals;