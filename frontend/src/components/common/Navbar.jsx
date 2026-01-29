import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiHome, FiUser, FiCalendar, FiLogOut, FiMenu, FiX, FiShield, FiActivity } from 'react-icons/fi';
import { MdLocalHospital, MdMedicalServices, MdPeople } from 'react-icons/md';

const Navbar = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Bookings', path: '/bookings', icon: <FiCalendar /> },
    { name: 'Profile', path: '/profile', icon: <FiUser /> },
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin', icon: <FiShield /> },
    { name: 'Manage Hospitals', path: '/admin/hospitals', icon: <MdLocalHospital /> },
    { name: 'Manage Treatments', path: '/admin/treatments', icon: <MdMedicalServices /> },
    { name: 'Manage Doctors', path: '/admin/doctors', icon: <MdPeople /> },
    { name: 'Manage Bookings', path: '/admin/bookings', icon: <FiCalendar /> },
  ];

  const publicLinks = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Hospitals', path: '/hospitals', icon: <MdLocalHospital /> },
    { name: 'Treatments', path: '/treatments', icon: <MdMedicalServices /> },
    { name: 'Doctors', path: '/doctors', icon: <MdPeople /> },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FiActivity className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-gray-800">MediIndia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}

            {/* User Links (if authenticated) */}
            {user && (
              <>
                {userLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Admin Links (if admin) */}
                {hasRole('admin') && (
                  <>
                    {adminLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:text-purple-800 hover:bg-purple-50 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </>
                )}

                {/* User Menu */}
                <div className="relative group ml-2">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-primary font-medium capitalize mt-1">{user.role}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Login/Register (if not authenticated) */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Public Links */}
            {publicLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}

            {/* User Links */}
            {user && (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Account
                </div>
                {userLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </Link>
                ))}

                {/* Admin Links */}
                {hasRole('admin') && (
                  <>
                    <div className="px-3 py-2 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                      Admin
                    </div>
                    {adminLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-purple-700 hover:text-purple-800 hover:bg-purple-50"
                      >
                        <span className="mr-2">{link.icon}</span>
                        {link.name}
                      </Link>
                    ))}
                  </>
                )}

                {/* User Info */}
                <div className="px-3 py-2 border-t">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white mr-3">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </>
            )}

            {/* Login/Register */}
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                >
                  <FiUser className="mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;