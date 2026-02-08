import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { doctorService } from '../services/doctorService';
import { 
  FiUser, 
  FiMapPin, 
  FiStar, 
  FiAward, 
  FiCalendar, 
  FiArrowLeft,
  FiBriefcase,
  FiCheckCircle,
  FiActivity,
  FiMessageSquare
} from 'react-icons/fi';

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true);
      const data = await doctorService.getDoctorById(id);
      setDoctor(data);
    } catch (error) {
      console.error('Failed to fetch doctor details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!doctor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h2>
        <Link to="/doctors" className="text-primary hover:text-blue-600 font-medium">
          ← Back to Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div>
        <Link 
          to="/doctors" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-2" />
          Back to Doctors
        </Link>
      </div>

      {/* Doctor Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Doctor Image/Placeholder */}
            <div className="flex-shrink-0">
              {doctor.profileImage ? (
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="w-48 h-48 rounded-xl object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-48 h-48 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center text-white text-6xl font-bold border-4 border-white shadow-lg">
                  {doctor.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dr. {doctor.name}</h1>
                  <div className="flex items-center mt-2">
                    <p className="text-xl text-primary font-medium">{doctor.specialization}</p>
                    <span className="mx-3 text-gray-300">•</span>
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">4.8</span>
                      <span className="text-gray-500 text-sm ml-1">(120 reviews)</span>
                    </div>
                  </div>

                  {/* Experience */}
                  {doctor.experience && (
                    <div className="flex items-center mt-4">
                      <FiAward className="text-yellow-500 mr-2" />
                      <span className="text-gray-700 font-medium">
                        {doctor.experience} years of experience
                      </span>
                    </div>
                  )}

                  {/* Hospital */}
                  {doctor.hospital && (
                    <div className="flex items-center mt-3">
                      <FiMapPin className="text-gray-400 mr-2" />
                      <div>
                        <p className="font-medium text-gray-900">{doctor.hospital.name}</p>
                        <p className="text-gray-600">
                          {doctor.hospital.city}, {doctor.hospital.country || 'India'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      doctor.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <FiCheckCircle className="mr-1" />
                      {doctor.isActive ? 'Currently Accepting Patients' : 'Not Available'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 min-w-[200px]">
                  <Link
                    to={`/bookings/create`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                  >
                    <FiCalendar className="mr-2" />
                    Book Consultation
                  </Link>
                  
                  {doctor.hospital && (
                    <Link
                      to={`/hospitals/${doctor.hospital._id}`}
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      <FiMapPin className="mr-2" />
                      Visit Hospital
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'about'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiUser className="inline mr-2" />
              About
            </button>
            
            <button
              onClick={() => setActiveTab('specializations')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'specializations'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiBriefcase className="inline mr-2" />
              Specializations
            </button>
            
            <button
              onClick={() => setActiveTab('availability')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'availability'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FiCalendar className="inline mr-2" />
              Availability
            </button>
          </nav>
        </div>

        <div className="p-8">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">About Dr. {doctor.name}</h2>
              
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700">
                  Dr. {doctor.name} is a highly experienced {doctor.specialization.toLowerCase()} with {doctor.experience || 'many'} years of practice. 
                  Specializing in {doctor.treatments?.map(t => t.name).join(', ') || 'various medical treatments'}, 
                  Dr. {doctor.name.split(' ')[0]} is committed to providing the highest quality care to patients.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Education & Qualifications</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <FiAward className="mt-1 mr-2 text-primary flex-shrink-0" />
                        <span>MD in {doctor.specialization}</span>
                      </li>
                      <li className="flex items-start">
                        <FiAward className="mt-1 mr-2 text-primary flex-shrink-0" />
                        <span>Board Certified {doctor.specialization}</span>
                      </li>
                      <li className="flex items-start">
                        <FiAward className="mt-1 mr-2 text-primary flex-shrink-0" />
                        <span>Fellowship in Advanced Medical Procedures</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Areas of Expertise</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <FiActivity className="mt-1 mr-2 text-primary flex-shrink-0" />
                        <span>{doctor.specialization} Consultation</span>
                      </li>
                      <li className="flex items-start">
                        <FiActivity className="mt-1 mr-2 text-primary flex-shrink-0" />
                        <span>Treatment Planning</span>
                      </li>
                      <li className="flex items-start">
                        <FiActivity className="mt-1 mr-2 text-primary flex-shrink-0" />
                        <span>Post-operative Care</span>
                      </li>
                      <li className="flex items-start">
                        <FiActivity className="mt-1 mr-2 text-primary flex-shrink-0" />
                        <span>Medical Second Opinions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Specializations Tab */}
          {activeTab === 'specializations' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Specialized Treatments</h2>
              
              {doctor.treatments && doctor.treatments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctor.treatments.map(treatment => (
                    <div key={treatment._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{treatment.name}</h3>
                          <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            {treatment.category}
                          </span>
                        </div>
                        <FiActivity className="text-primary text-xl" />
                      </div>
                      
                      {treatment.description && (
                        <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                          {treatment.description}
                        </p>
                      )}

                      <div className="mt-4">
                        <Link
                          to={`/treatments/${treatment._id}`}
                          className="text-primary hover:text-blue-600 font-medium text-sm flex items-center"
                        >
                          View Treatment Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiBriefcase className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-600">No specialized treatments listed yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Consultation Availability</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinic Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Monday - Friday</span>
                      <span className="text-gray-700">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Saturday</span>
                      <span className="text-gray-700">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Sunday</span>
                      <span className="text-gray-700">Emergency Only</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Types</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">In-Person Consultation</p>
                          <p className="text-sm text-gray-600">At hospital clinic</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Available
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Video Consultation</p>
                          <p className="text-sm text-gray-600">Online video call</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Available
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="mt-8 p-6 bg-gradient-to-r from-primary to-blue-600 rounded-xl text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">Ready to Consult?</h3>
                    <p className="opacity-90 mt-1">
                      Book an appointment with Dr. {doctor.name} for expert medical advice
                    </p>
                  </div>
                  <Link
                    to="/bookings/create"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                  >
                    <FiCalendar className="mr-2" />
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact & Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            {doctor.hospital && (
              <div className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Hospital Address</p>
                  <p className="text-gray-600">
                    {doctor.hospital.name}<br />
                    {doctor.hospital.city}, {doctor.hospital.country || 'India'}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center">
              <FiMessageSquare className="mr-3 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Consultation Fee</p>
                <p className="text-gray-600">Starting from $100 (Varies by treatment)</p>
              </div>
            </div>

            <div className="flex items-center">
              <FiCalendar className="mr-3 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Average Wait Time</p>
                <p className="text-gray-600">2-3 days for appointments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Booking */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Book a Consultation</h3>
          <p className="opacity-90 mb-6">
            Get personalized medical advice from Dr. {doctor.name}. Choose between in-person or video consultation.
          </p>
          
          <div className="space-y-3">
            <Link
              to="/bookings/create"
              className="block w-full text-center py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Book In-Person Consultation
            </Link>
            
            <Link
              to="/bookings/create"
              className="block w-full text-center py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Book Video Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;