import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BusDetails.css";
import api from "../../api";
import Header from "../navbar/Navbar";
import Footer from "../footer/Footer";

const BusDetails = () => {
  const { id } = useParams(); // Get trip ID from URL
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${api.GetBus}/${id}`)
      .then((response) => {
        setBuses(response.data.buses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bus details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading bus details...</p>;

  return (
    <>
      <Header />
      <div className="bus-details-container">
        <h2>Available Buses for This Trip</h2>
        <div className="bus-list">
          {buses.length > 0 ? (
            buses.map((bus) => (
              <div key={bus.bus_id} className="bus-card">
               <img
  src={bus.Bus_image ? `http://localhost:5000${bus.Bus_image}` : "https://via.placeholder.com/400x200"}
  alt={bus.bus_number}
  className="bus-image"
/>
                <div className="bus-info">
                  <h3>{bus.bus_number}</h3>
                  <p>
                    <strong>Driver Name:</strong> {bus.driver_name}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {bus.contact_number}
                  </p>
                  <p>
                    <strong>Seating Capacity:</strong> {bus.seating_capacity}
                  </p>
                  {/* <button className="view-bus-button">
                    Make Payment for trip
                  </button> */}
                </div>
              </div>
            ))
          ) : (
            <p>No buses available for this trip.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BusDetails;
