import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./HotelForm.css"; // CSS for styling

const HotelForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken); // ✅ Token le raha hoon Redux se
  const navigate = useNavigate();

  const [hotelData, setHotelData] = useState({
    hotel_name: "",
    location: "",
    contact_number: "",
    trip_id: "", // ✅ Manually enter Trip ID
    Hotel_image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setHotelData({
      ...hotelData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const isFormValid =
    hotelData.hotel_name &&
    hotelData.location &&
    hotelData.contact_number &&
    hotelData.trip_id && // ✅ Trip ID manually enter hone chahiye
    hotelData.Hotel_image;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    if (!hotelData.trip_id) {
      toast.error("Please enter a valid Trip ID!");
      return;
    }

    const formData = new FormData();
    Object.keys(hotelData).forEach((key) => {
      formData.append(key, hotelData[key]);
    });

    console.log("Sending Data to Backend:", Object.fromEntries(formData));

    try {
      const response = await fetch("http://localhost:5000/hotel/addhotel", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${adminToken}`, // ✅ Token pass ho raha hai
        },
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (response.ok) {
        toast.success("Hotel Added Successfully!", { position: "top-center" });

        setHotelData({
          hotel_name: "",
          location: "",
          contact_number: "",
          trip_id: "", // ✅ Clear after success
          Hotel_image: null,
        });

        setTimeout(() => {
          navigate("/create/bus"); // ✅ Bus page pe redirect karega
        }, 3000);
      } else {
        toast.error(data.error || "Failed to add hotel!");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Server error!");
    }
  };

  return (
    <div className="hotel-form-container">
      <h2>Add a Hotel</h2>
      <form onSubmit={handleSubmit} className="hotel-form">
        <input type="text" name="hotel_name" placeholder="Hotel Name" value={hotelData.hotel_name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={hotelData.location} onChange={handleChange} required />
        <input type="text" name="contact_number" placeholder="Contact Number" value={hotelData.contact_number} onChange={handleChange} required />
        <input type="text" name="trip_id" placeholder="Enter Trip ID" value={hotelData.trip_id} onChange={handleChange} required /> {/* ✅ Manual Trip ID */}
        <input type="file" name="Hotel_image" accept="image/*" onChange={handleChange} required />

        <button type="submit" disabled={!isFormValid} className="submit-btn">
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default HotelForm;
