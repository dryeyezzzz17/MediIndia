import React from "react";
import BookingCard from "./BookingCard";

const BookingList = ({ bookings = [], loading = false }) => {

  
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {bookings.map((booking) => (
        <BookingCard key={booking._id || booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingList;
