import { useEffect, useState } from "react";
import axios from "axios";
import "./UserBookings.css";

const UserBookings = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id; // instead of user?.user_id
console.log("User ID:", userId);

  console.log("User from localStorage:", user);
  console.log("User ID:", userId);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log(`Fetching bookings for user ID: ${userId}`);
        const response = await axios.get(`http://localhost:5000/bookings/${userId}`);
        console.log("API response:", response.data);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    } else {
      setLoading(false);
      console.log("No user logged in");
    }
  }, [userId]);

  if (loading) return <p>Fetching your bookings...</p>;
  if (error) return <p className="ub-error">{error}</p>;

  return (
    <div className="ub-container">
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <div className="ub-list">
          {bookings.map((booking) => (
            <div key={booking.booking_id} className="ub-card">
              <h3>{booking?.Trip?.trip_name || "Trip Name Not Available"}</h3>
              <p><strong>Start Date:</strong> {new Date(booking?.Trip?.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(booking?.Trip?.end_date).toLocaleDateString()}</p>
              <p><strong>Price:</strong> ₹{booking?.Trip?.Trip_price}</p>
              <p><strong>Booking ID:</strong> {booking?.booking_id}</p>
              <p><strong>User Name:</strong> {booking?.User?.username}</p>
              <p><strong>Email:</strong> {booking?.User?.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserBookings;
