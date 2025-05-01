import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HotelDetails.css";
import api from "../../api";
import Header from "../navbar/Navbar";
import Footer from "../footer/Footer";

const HotelDetails = () => {
  const { id } = useParams(); // Get trip ID from URL
  const [hotels, setHotels] = useState([]); // Default state is an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${api.GetHotel}/${id}`)
      .then((response) => {
        // Check if response.data.hotels exists before setting state
        setHotels(response.data.hotels || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
        setHotels([]); // Ensure hotels is always an array
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading hotel details...</p>;

  return (
    <>
      <Header className="Fixed-top" />
      <div className="hotel-details-container">
        <h2>Available Hotels for This Trip</h2>
        <div className="hotel-list">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div key={hotel.hotel_id} className="hotel-card">
                <img
  src={hotel.Hotel_image ? `http://localhost:5000${hotel.Hotel_image}` : "https://via.placeholder.com/400x200"}
  alt={hotel.hotel_name}
  className="hotel-image"
/>
                <div className="hotel-info">
                  <h3>{hotel.hotel_name}</h3>
                  <p>
                    <strong>Location:</strong> {hotel.location}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {hotel.contact_number}
                  </p>
                  <button className="view-hotel-button">
                    View Hotel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hotels available for this trip.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelDetails;
