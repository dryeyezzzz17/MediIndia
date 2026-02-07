import React, { useState, useEffect } from 'react';
import TreatmentCard from '../components/treatments/TreatmentCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { treatmentService } from '../services/treatmentService';
import { TREATMENT_CATEGORIES, getCategoryColor } from '../utils/helpers';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchTreatments();
  }, []);

  useEffect(() => {
    filterTreatments();
  }, [treatments, searchTerm, categoryFilter]);

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      const data = await treatmentService.getAllTreatments();
      setTreatments(data);
      setFilteredTreatments(data);
    } catch (error) {
      console.error('Failed to fetch treatments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTreatments = () => {
    let filtered = treatments;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(treatment =>
        treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        treatment.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(treatment =>
        treatment.category === categoryFilter
      );
    }

    setFilteredTreatments(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Medical Treatments</h1>
        <p className="text-gray-600 mt-2">
          Browse and compare medical treatments from top hospitals
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Treatments
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
                placeholder="Search by name or description..."
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="">All Categories</option>
                {TREATMENT_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Mode
            </label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 py-2 flex items-center justify-center ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiGrid className="mr-2" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 py-2 flex items-center justify-center ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiList className="mr-2" />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters and Results */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            {(searchTerm || categoryFilter) && (
              <>
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    Search: "{searchTerm}"
                  </span>
                )}
                {categoryFilter && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getCategoryColor(categoryFilter)}`}>
                    {categoryFilter}
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
            Showing <span className="font-semibold">{filteredTreatments.length}</span> treatments
          </p>
        </div>
      </div>

      {/* Treatments Grid/List */}
      {filteredTreatments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FiSearch className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No treatments found</h3>
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
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredTreatments.map(treatment => (
            <TreatmentCard 
              key={treatment._id} 
              treatment={treatment}
              showActions={false}
            />
          ))}
        </div>
      )}

      {/* Category Quick Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {TREATMENT_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setCategoryFilter(categoryFilter === category ? '' : category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                categoryFilter === category 
                  ? getCategoryColor(category)
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Treatments;