import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./TripUpdateForm.css"; // CSS for styling

const TripUpdateForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();

  const [tripData, setTripData] = useState({
    trip_id: "", // New field for specifying the trip to update
    trip_name: "",
    description: "",
    start_date: "",
    end_date: "",
    nights: "",
    days: "",
    meals: "",
    Trip_price: "",
    Trip_image: null, // Image file
    nightcamping: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setTripData({
      ...tripData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const isFormValid =
    tripData.trip_id &&
    tripData.trip_name &&
    tripData.start_date &&
    tripData.end_date &&
    tripData.nights &&
    tripData.days &&
    tripData.Trip_price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    const formData = new FormData();
    Object.keys(tripData).forEach((key) => {
      formData.append(key, tripData[key]);
    });

    try {
      const response = await fetch(`http://localhost:5000/trip/update/${tripData.trip_id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Trip Updated Successfully!", { position: "top-center" });
        setTripData({
          trip_id: "",
          trip_name: "",
          description: "",
          start_date: "",
          end_date: "",
          nights: "",
          days: "",
          meals: "",
          Trip_price: "",
          Trip_image: null,
          nightcamping: false,
        });
        setTimeout(() => {
          window.alert("Trip updated successfully");
          toast.success("Trip updated successfully");
          navigate("/admin/home"); // Redirect to trip list page
        }, 5000);
      } else {
        toast.error(data.error || "Failed to update trip!");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div className="trip-form-container">
      <h2>Update a Trip</h2>
      <form onSubmit={handleSubmit} className="trip-form">
        <input type="text" name="trip_id" placeholder="Trip ID" value={tripData.trip_id} onChange={handleChange} required />
        <input type="text" name="trip_name" placeholder="Trip Name" value={tripData.trip_name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={tripData.description} onChange={handleChange} />
        <input type="date" name="start_date" value={tripData.start_date} onChange={handleChange} required />
        <input type="date" name="end_date" value={tripData.end_date} onChange={handleChange} required />
        <input type="number" name="nights" placeholder="Nights" value={tripData.nights} onChange={handleChange} required />
        <input type="number" name="days" placeholder="Days" value={tripData.days} onChange={handleChange} required />
        <input type="text" name="meals" placeholder="Meals (e.g., Breakfast, Lunch, Dinner)" value={tripData.meals} onChange={handleChange} />
        <input type="number" name="Trip_price" placeholder="Trip Price" value={tripData.Trip_price} onChange={handleChange} required />
        
        {/* Image Upload */}
        <input type="file" name="Trip_image" accept="image/*" onChange={handleChange} />

        {/* Checkbox (Night Camping) */}
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="nightcamping" checked={tripData.nightcamping} onChange={handleChange} />
            Night Camping
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={!isFormValid} className="submit-btn">
          Update Trip
        </button>
      </form>
    </div>
  );
};

export default TripUpdateForm;
