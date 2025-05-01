import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./BusForm.css"; // CSS for styling

const BusForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();

  const [busData, setBusData] = useState({
    trip_id: "", // ✅ Trip ID manually enter karenge
    bus_number: "",
    seating_capacity: "",
    driver_name: "",
    contact_number: "",
    Bus_image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setBusData({
      ...busData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const isFormValid =
    busData.trip_id &&
    busData.bus_number &&
    busData.seating_capacity &&
    busData.driver_name &&
    busData.contact_number &&
    busData.Bus_image;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    const formData = new FormData();
    Object.keys(busData).forEach((key) => {
      formData.append(key, busData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/bus/addbus", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (response.ok) {
        toast.success("Bus Added Successfully!", { position: "top-center" });

        setBusData({
          trip_id: "",
          bus_number: "",
          seating_capacity: "",
          driver_name: "",
          contact_number: "",
          Bus_image: null,
        });

        setTimeout(() => {
          navigate("/pickupPoint/create"); // ✅ Home page pe redirect
        }, 4000);
      } else {
        toast.error(data.error || "Failed to add bus!");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Server error!");
    }
  };

  return (
    <div className="bus-form-container">
      <h2>Add a Bus</h2>
      <form onSubmit={handleSubmit} className="bus-form">
        <input type="text" name="trip_id" placeholder="Trip ID" value={busData.trip_id} onChange={handleChange} required />
        <input type="text" name="bus_number" placeholder="Bus Number" value={busData.bus_number} onChange={handleChange} required />
        <input type="number" name="seating_capacity" placeholder="Seating Capacity" value={busData.seating_capacity} onChange={handleChange} required />
        <input type="text" name="driver_name" placeholder="Driver Name" value={busData.driver_name} onChange={handleChange} required />
        <input type="text" name="contact_number" placeholder="Contact Number" value={busData.contact_number} onChange={handleChange} required />
        <input type="file" name="Bus_image" accept="image/*" onChange={handleChange} required />

        <button type="submit" disabled={!isFormValid} className="submit-btn">
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default BusForm;
