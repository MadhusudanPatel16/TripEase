import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import "./UserBookings.css";

const UserBookings = () => {
  const userId = useSelector((state) => state.booking.userId);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bookings/${userId}`);
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
            <div key={booking?.booking_id} className="ub-card">
              
              <h3>{booking?.Trip?.trip_name || "Trip Name Not Available"}</h3>
              <p className="ub-text">
                <strong className="ub-strong">Start Date:</strong> {new Date(booking?.Trip?.start_date).toLocaleDateString() || "N/A"}
              </p>
              <p className="ub-text">
                <strong className="ub-strong">End Date:</strong> {new Date(booking?.Trip?.end_date).toLocaleDateString() || "N/A"}
              </p>
              <p className="ub-text">
                <strong className="ub-strong">Price:</strong> ₹{booking?.Trip?.Trip_price || "N/A"}
              </p>

              {/* ✅ Booking Details */}
              <p className="ub-text">
                <strong className="ub-strong">Booking ID:</strong> {booking?.booking_id}
              </p>

              {/* ✅ User Details */}
              <p className="ub-text">
                <strong className="ub-strong">User Name:</strong> {booking?.User?.username || "N/A"}
              </p>
              <p className="ub-text">
                <strong className="ub-strong">Email:</strong> {booking?.User?.email || "N/A"}
              </p>
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
