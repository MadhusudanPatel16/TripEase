import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Tripdetail.css";
import api from "../../api";
import Header from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setBookingDetails } from "../../redux-config/slices/bookingSlice";

const TripDetails = () => {
  const { isLoggedIn, user } = useSelector((store) => store.user);
  console.log("✅ Redux - isLoggedIn:", isLoggedIn);
  console.log("✅ Redux - User Data:", user);

  const dispatch = useDispatch();
  const { id } = useParams(); // Get trip ID from URL
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        console.log("⏳ Fetching trip details...");
        const response = await axios.get(`${api.Trips_Id}/${id}`);
        console.log("✅ Trip Details Fetched:", response.data);
        setTrip(response.data.trip);
      } catch (error) {
        console.error("❌ Error fetching trip details:", error);
        toast.error("Failed to fetch trip details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  if (loading) return <p>Loading trip details...</p>;
  if (!trip) return <p>No trip found.</p>;

  const imageUrl = trip.Trip_image
    ? `http://localhost:5000${trip.Trip_image.replace("./", "/")}`
    : "https://via.placeholder.com/600x300";

    const BookTrip = async () => {
      if (!user || !user.id) { // ✅ Fix: `user_id` ki jagah `user.id`
        console.log("❌ User not logged in. Redirecting to login...");
        toast.error("Please login to book a trip!");
        navigate("/user/login");
        return;
      }
    
      console.log("✅ Booking Trip...");
      console.log("✅ User ID:", user.id);  // ✅ Fix: `user_id` ki jagah `user.id`
      console.log("✅ Trip ID:", id);
    
      try {
        const response = await fetch("http://localhost:5000/bookings/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,  // ✅ Fix: `user.user_id` ki jagah `user.id`
            trip_id: id,
          }),
        });
    
        const responseData = await response.json();
        console.log("✅ Booking API Response:", responseData);
    
        if (response.ok) {
          toast.success("🎉 Booking successful!");
          toast.info("Check your bookings on the UserBookings page.");
          
          console.log("✅ Dispatching Redux Action: setBookingDetails");
          dispatch(setBookingDetails({ tripId: id, userId: user.id })); // ✅ Fix: `user.user_id` ki jagah `user.id`
    
          console.log("⏳ Redirecting to UserBookings page in 5 seconds...");
          setTimeout(() => navigate("/userBookings"), 5000);
        } else {
          console.error("❌ Booking Failed:", responseData);
          toast.error(responseData.error || "Booking failed! Try again.");
        }
      } catch (error) {
        console.error("❌ Error booking trip:", error);
        toast.error("Something went wrong! Try again later.");
      }
    };

  return (
    <>
      <Header />
      <div className="trip-details-container">
        <div className="trip-header">
          <img src={imageUrl} alt={trip.trip_name} className="trip-banner" />
          <h1>{trip.trip_name}</h1>
        </div>

        <div className="trip-info">
          <p><strong>Start Date:</strong> {trip.start_date}</p>
          <p><strong>End Date:</strong> {trip.end_date}</p>
          <p><strong>Nights:</strong> {trip.nights}</p>
          <p><strong>Days:</strong> {trip.days}</p>
          <p><strong>Meals:</strong> {trip.meals}</p>
          <p><strong>Night Camping:</strong> {trip.nightcamping ? "Yes" : "No"}</p>
        </div>

        <div className="trip-buttons">
          <button onClick={() => navigate(`/buses/${id}`)}>View Buses</button>
          <button onClick={() => navigate(`/hotels/${id}`)}>View Hotels</button>
          <button onClick={() => navigate(`/pickupPoints/${id}`)}>View Pickup Points</button>
        </div>

        <div className="payment-button-container">
          <button className="make-payment-btn" onClick={BookTrip}>
            Book your trip
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TripDetails;
