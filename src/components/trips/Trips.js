import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Trips.css";
import api from "../../api";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(api.Trips)
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data.trips)) {
          setTrips(response.data.trips);
        } else {
          console.error("Invalid API response format");
        }
      })
      .catch((error) => console.error("Error fetching trips:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar/>
      <div className="trips-container">
        <h1>Explore Our Trips</h1>
        {loading ? (
          <p>Loading trips...</p>
        ) : trips.length > 0 ? (
          <div className="trips-list">
            {trips.map((trip, index) => {
              // Ensure image URL is correctly formatted
              const imageUrl = trip.Trip_image
                ? `http://localhost:5000${trip.Trip_image.replace("./", "/")}`
                : "https://via.placeholder.com/400x250";

              return (
                <div className="trip-card" key={trip.trip_id || index}>
                  <img
                    src={imageUrl}
                    alt={trip.trip_name}
                    className="trip-image"
                  />
                  <div className="trip-details">
                    <h2>{trip.trip_name}</h2>
                    <p>{trip.description}</p>
                    <p className="trip-price">
                      Price: <strong>₹{trip.Trip_price}</strong>
                    </p>
                    <Link to={`/trip/${trip.trip_id}`} className="view-trip-btn">
                      View Tour
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No trips available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Trips;
