import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdateHotelForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();

  const [hotelData, setHotelData] = useState({
    hotel_id: "",
    trip_id: "",
    hotel_name: "",
    location: "",
    contact_number: "",
    Hotel_image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setHotelData({
      ...hotelData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    const formData = new FormData();
    Object.keys(hotelData).forEach((key) => {
      formData.append(key, hotelData[key]);
    });

    try {
      const response = await fetch(`http://localhost:5000/hotel/update/${hotelData.hotel_id}`, {
        method: "PUT",
        body: formData,
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Hotel Updated Successfully!");
        navigate("/admin/hotels");
      } else {
        toast.error(data.message || "Failed to update hotel");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Hotel</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="hotel_id" placeholder="Hotel ID" value={hotelData.hotel_id} onChange={handleChange} required style={styles.input} />
        <input type="text" name="trip_id" placeholder="Trip ID" value={hotelData.trip_id} onChange={handleChange} required style={styles.input} />
        <input type="text" name="hotel_name" placeholder="Hotel Name" value={hotelData.hotel_name} onChange={handleChange} required style={styles.input} />
        <input type="text" name="location" placeholder="Location" value={hotelData.location} onChange={handleChange} required style={styles.input} />
        <input type="text" name="contact_number" placeholder="Contact Number" value={hotelData.contact_number} onChange={handleChange} required style={styles.input} />
        <input type="file" name="Hotel_image" accept="image/*" onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.button}>Update Hotel</button>
      </form>
    </div>
  );
};

const DeleteHotelForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();
  const [hotelId, setHotelId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/hotel/delete/${hotelId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Hotel Deleted Successfully!");
        navigate("/admin/hotels");
      } else {
        toast.error(data.message || "Failed to delete hotel");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Delete Hotel</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Hotel ID" value={hotelId} onChange={(e) => setHotelId(e.target.value)} required style={styles.input} />
        <button type="submit" style={{ ...styles.button, backgroundColor: "#dc3545" }}>Delete Hotel</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export { UpdateHotelForm, DeleteHotelForm };
