import React from 'react';
import BookingForm from '../components/bookings/BookingForm';

const CreateBooking = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Medical Treatment</h1>
        <p className="text-gray-600 mt-2">
          Select hospital, treatment, and preferred date for your booking
        </p>
      </div>
      <BookingForm />
    </div>
  );
};

export default CreateBooking;