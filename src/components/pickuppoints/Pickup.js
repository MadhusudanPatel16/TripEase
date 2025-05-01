import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Pickup.css";
import api from "../../api";
import Header from "../navbar/Navbar";
import Footer from "../footer/Footer";

const PickupPointsDetails = () => {
  const { id } = useParams(); // Get trip ID from URL
  const [pickupPoints, setPickupPoints] = useState([]); // Default empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${api.PickupPoints}/${id}`)
      .then((response) => {
        setPickupPoints(response.data.pickupPoints || []); // Ensure array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pickup points:", error);
        setPickupPoints([]); // Handle errors gracefully
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading pickup points...</p>;

  return (
    <>
      <Header />
      <div className="pickup-points-container">
        <h2>Available Pickup Points</h2>
        <div className="pickup-list">
          {pickupPoints.length > 0 ? (
            pickupPoints.map((point) => (
              <div key={point.pickup_point_id} className="pickup-card">
                <h3>{point.location}</h3>
                <p>
                  <strong>Pickup Time:</strong> {point.time}
                </p>
              </div>
            ))
          ) : (
            <p>No pickup points available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PickupPointsDetails;
