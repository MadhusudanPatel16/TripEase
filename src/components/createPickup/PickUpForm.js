import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./PickUpForm.css"; // CSS for styling

const PickupPointForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();

  const [pickupData, setPickupData] = useState({
    trip_id: "",
    location: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPickupData({
      ...pickupData,
      [name]: value,
    });
  };

  const isFormValid = pickupData.trip_id && pickupData.location && pickupData.time;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }
  
    const requestData = {
      trip_id: pickupData.trip_id,
      location: pickupData.location,
      time: pickupData.time,
    };
  
    console.log("Sending Data to Backend:", requestData);
  
    try {
      const response = await fetch("http://localhost:5000/pickupPoint/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      console.log("Backend Response:", data);
  
      if (response.ok) {
        toast.success("Pickup Point Added Successfully!", { position: "top-center" });
  
        setPickupData({
          trip_id: "",
          location: "",
          time: "",
        });
  
        setTimeout(() => {
          navigate("/admin/home"); // ✅ Home page pe le jao
        }, 5000);
      } else {
        toast.error(data.error || "Failed to add pickup point!");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Server error!");
    }
  };
  
  return (
    <div className="pickup-form-container">
      <h2>Add a Pickup Point</h2>
      <form onSubmit={handleSubmit} className="pickup-form">
        <input type="text" name="trip_id" placeholder="Trip ID" value={pickupData.trip_id} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={pickupData.location} onChange={handleChange} required />
        <input type="time" name="time" value={pickupData.time} onChange={handleChange} required />

        <button type="submit" disabled={!isFormValid} className="submit-btn">
          Add Pickup Point
        </button>
      </form>
    </div>
  );
};

export default PickupPointForm;
