import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Hospitals from './pages/Hospitals';
import HospitalDetail from './pages/HospitalDetail';
import Treatments from './pages/Treatments';
import TreatmentDetail from './pages/TreatmentDetail';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Bookings from './pages/Bookings';
import CreateBooking from './pages/CreateBooking';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageHospitals from './pages/Admin/ManageHospitals';
import ManageTreatments from './pages/Admin/ManageTreatments';
import ManageDoctors from './pages/Admin/ManageDoctors';
import ManageBookings from './pages/Admin/ManageBookings';
import ManageHospitalTreatments from './pages/Admin/ManageHospitalTreatments';

// Components
import NotFound from './components/common/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="hospitals" element={<Hospitals />} />
          <Route path="hospitals/:id" element={<HospitalDetail />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="treatments/:id" element={<TreatmentDetail />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:id" element={<DoctorDetail />} />
          
          {/* Protected User Routes */}
          <Route element={<ProtectedRoute allowedRoles={['user', 'admin', 'doctor', 'hospitalAdmin']} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/create" element={<CreateBooking />} />
          </Route>
          
          {/* Admin Only Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin">
              <Route index element={<AdminDashboard />} />
              <Route path="hospitals" element={<ManageHospitals />} />
              <Route path="treatments" element={<ManageTreatments />} />
              <Route path="doctors" element={<ManageDoctors />} />
              <Route path="bookings" element={<ManageBookings />} />
              <Route path="hospital-treatments" element={<ManageHospitalTreatments />} />
            </Route>
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;