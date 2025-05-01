import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdatePickupPointForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();

  const [pickupData, setPickupData] = useState({
    pickup_id: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/pickup/update/${pickupData.pickup_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(pickupData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Pickup Point Updated Successfully!");
        navigate("/admin/pickup-points");
      } else {
        toast.error(data.message || "Failed to update pickup point");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Pickup Point</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="pickup_id" placeholder="Pickup ID" value={pickupData.pickup_id} onChange={handleChange} required style={styles.input} />
        <input type="text" name="trip_id" placeholder="Trip ID" value={pickupData.trip_id} onChange={handleChange} required style={styles.input} />
        <input type="text" name="location" placeholder="Location" value={pickupData.location} onChange={handleChange} required style={styles.input} />
        <input type="text" name="time" placeholder="Time" value={pickupData.time} onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.button}>Update Pickup Point</button>
      </form>
    </div>
  );
};

const DeletePickupPointForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();
  const [pickupId, setPickupId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/pickupPoint/${pickupId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Pickup Point Deleted Successfully!");
        navigate("/admin/home");
      } else {
        toast.error(data.message || "Failed to delete pickup point");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Delete Pickup Point</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Pickup ID" value={pickupId} onChange={(e) => setPickupId(e.target.value)} required style={styles.input} />
        <button type="submit" style={{ ...styles.button, backgroundColor: "#dc3545" }}>Delete Pickup Point</button>
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

export { UpdatePickupPointForm, DeletePickupPointForm };
