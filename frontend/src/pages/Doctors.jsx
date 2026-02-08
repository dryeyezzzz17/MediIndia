import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DoctorCard from '../components/doctors/DoctorCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { doctorService } from '../services/doctorService';
import { FiSearch, FiFilter, FiUser, FiMapPin, FiStar, FiX } from 'react-icons/fi';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [hospitalFilter, setHospitalFilter] = useState('');
  const [uniqueSpecializations, setUniqueSpecializations] = useState([]);
  const [uniqueHospitals, setUniqueHospitals] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, searchTerm, specializationFilter, hospitalFilter]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
      
      // Extract unique specializations
      const specializations = [...new Set(data.map(d => d.specialization))].sort();
      setUniqueSpecializations(specializations);
      
      // Extract unique hospitals
      const hospitals = [...new Set(data.map(d => d.hospital?.name).filter(Boolean))].sort();
      setUniqueHospitals(hospitals);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply specialization filter
    if (specializationFilter) {
      filtered = filtered.filter(doctor =>
        doctor.specialization.toLowerCase().includes(specializationFilter.toLowerCase())
      );
    }

    // Apply hospital filter
    if (hospitalFilter) {
      filtered = filtered.filter(doctor =>
        doctor.hospital?.name?.toLowerCase().includes(hospitalFilter.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSpecializationFilter('');
    setHospitalFilter('');
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Our Medical Team</h1>
        <p className="text-gray-600 mt-2">
          Meet our team of experienced medical professionals and specialists
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
              <p className="text-gray-600 text-sm">Total Doctors</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiUser className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{uniqueSpecializations.length}</p>
              <p className="text-gray-600 text-sm">Specializations</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <FiStar className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{uniqueHospitals.length}</p>
              <p className="text-gray-600 text-sm">Hospitals</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiMapPin className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(doctors.reduce((acc, d) => acc + (d.experience || 0), 0) / doctors.length) || 0}
              </p>
              <p className="text-gray-600 text-sm">Avg. Experience</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FiStar className="text-yellow-600" />
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
              Search Doctors
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
                placeholder="Search by name, specialization, or hospital..."
              />
            </div>
          </div>

          {/* Specialization Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Specialization
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="">All Specializations</option>
                {uniqueSpecializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Hospital Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Hospital
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="text-gray-400" />
              </div>
              <select
                value={hospitalFilter}
                onChange={(e) => setHospitalFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="">All Hospitals</option>
                {uniqueHospitals.map(hospital => (
                  <option key={hospital} value={hospital}>{hospital}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            {(searchTerm || specializationFilter || hospitalFilter) && (
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
                {specializationFilter && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {specializationFilter}
                    <button
                      onClick={() => setSpecializationFilter('')}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                )}
                {hospitalFilter && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    {hospitalFilter}
                    <button
                      onClick={() => setHospitalFilter('')}
                      className="ml-2 text-purple-600 hover:text-purple-800"
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
          </div>
          
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredDoctors.length}</span> doctors
          </p>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FiUser className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || specializationFilter || hospitalFilter ? 'No doctors found' : 'No doctors available'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || specializationFilter || hospitalFilter 
              ? 'Try adjusting your search or filter to find what you\'re looking for.'
              : 'Check back later for our medical team updates.'
            }
          </p>
          {(searchTerm || specializationFilter || hospitalFilter) && (
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <DoctorCard 
              key={doctor._id} 
              doctor={doctor}
              showActions={false}
            />
          ))}
        </div>
      )}

      {/* Quick Filter Links */}
      {(uniqueSpecializations.length > 0 || uniqueHospitals.length > 0) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
          
          {/* Specializations */}
          {uniqueSpecializations.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Browse by Specialization:</p>
              <div className="flex flex-wrap gap-2">
                {uniqueSpecializations.slice(0, 6).map(spec => (
                  <button
                    key={spec}
                    onClick={() => setSpecializationFilter(specializationFilter === spec ? '' : spec)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      specializationFilter === spec 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hospitals */}
          {uniqueHospitals.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Browse by Hospital:</p>
              <div className="flex flex-wrap gap-2">
                {uniqueHospitals.slice(0, 6).map(hospital => (
                  <button
                    key={hospital}
                    onClick={() => setHospitalFilter(hospitalFilter === hospital ? '' : hospital)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      hospitalFilter === hospital 
                        ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {hospital}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Doctors;