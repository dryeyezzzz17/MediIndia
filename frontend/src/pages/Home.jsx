import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  FiSearch, 
  FiShield, 
  FiUsers, 
  FiGlobe, 
  FiArrowRight,
  FiActivity,
  FiCalendar,
  FiStar
} from 'react-icons/fi';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: <FiSearch className="text-2xl" />,
      title: "Find Best Hospitals",
      description: "Discover top-rated hospitals with advanced medical facilities"
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "Verified Treatments",
      description: "Access verified medical treatments with transparent pricing"
    },
    {
      icon: <FiUsers className="text-2xl" />,
      title: "Expert Doctors",
      description: "Connect with experienced doctors and specialists"
    },
    {
      icon: <FiGlobe className="text-2xl" />,
      title: "Global Access",
      description: "Access healthcare services from anywhere in the world"
    }
  ];

  const stats = [
    { label: "Hospitals", value: "50+", icon: <FiActivity /> },
    { label: "Treatments", value: "200+", icon: <FiCalendar /> },
    { label: "Doctors", value: "500+", icon: <FiUsers /> },
    { label: "Patients Served", value: "10K+", icon: <FiStar /> }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Your Journey to Better Health 
                <span className="text-primary block">Starts Here</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                Book medical treatments at top hospitals worldwide. Connect with specialists, 
                compare prices, and manage your healthcare journey all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/bookings/create"
                      className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 text-lg"
                    >
                      Book Treatment
                      <FiArrowRight className="ml-2" />
                    </Link>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-800 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 text-lg"
                    >
                      Go to Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 text-lg"
                    >
                      Get Started
                      <FiArrowRight className="ml-2" />
                    </Link>
                    <Link
                      to="/hospitals"
                      className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-800 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 text-lg"
                    >
                      Explore Hospitals
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FiActivity className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Cardiac Surgery</p>
                      <p className="text-sm text-gray-600">Starting from $8,000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <FiCalendar className="text-green-600 text-2xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Orthopedic Surgery</p>
                      <p className="text-sm text-gray-600">Starting from $5,000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <FiUsers className="text-purple-600 text-2xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Cosmetic Surgery</p>
                      <p className="text-sm text-gray-600">Starting from $3,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 mt-1">{stat.label}</p>
                </div>
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                  <div className="text-primary">{stat.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MediIndia?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide a seamless healthcare booking experience with transparency and trust
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-3 bg-primary bg-opacity-10 rounded-lg inline-block mb-4">
                <div className="text-primary">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Healthcare Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients who have found their perfect treatment match
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? "/bookings/create" : "/register"}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 text-lg"
            >
              {isAuthenticated ? "Book Now" : "Get Started Free"}
            </Link>
            <Link
              to="/treatments"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-200 text-lg"
            >
              Browse Treatments
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;