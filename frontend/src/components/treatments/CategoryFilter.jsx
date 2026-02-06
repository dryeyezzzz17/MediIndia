import React from 'react';
import { TREATMENT_CATEGORIES, getCategoryColor } from '../../utils/helpers';
import { FiFilter } from 'react-icons/fi';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter by Category</h3>
        <FiFilter className="text-gray-400" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        <button
          onClick={() => onSelectCategory('')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            selectedCategory === '' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        
        {TREATMENT_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category 
                ? getCategoryColor(category) 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;