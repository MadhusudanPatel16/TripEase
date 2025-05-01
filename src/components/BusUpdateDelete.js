import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdateBusForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();

  const [busData, setBusData] = useState({
    bus_id: "", 
    trip_id: "",
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
      const response = await fetch(`http://localhost:5000/bus/update/${busData.bus_id}`, {
        method: "PUT",
        body: formData,
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Bus Updated Successfully!");
        navigate("/admin/buses");
      } else {
        toast.error(data.message || "Failed to update bus");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Bus</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="bus_id" placeholder="Bus ID" value={busData.bus_id} onChange={handleChange} required style={styles.input} />
        <input type="text" name="trip_id" placeholder="Trip ID" value={busData.trip_id} onChange={handleChange} required style={styles.input} />
        <input type="text" name="bus_number" placeholder="Bus Number" value={busData.bus_number} onChange={handleChange} required style={styles.input} />
        <input type="text" name="seating_capacity" placeholder="Seating Capacity" value={busData.seating_capacity} onChange={handleChange} required style={styles.input} />
        <input type="text" name="driver_name" placeholder="Driver Name" value={busData.driver_name} onChange={handleChange} required style={styles.input} />
        <input type="text" name="contact_number" placeholder="Contact Number" value={busData.contact_number} onChange={handleChange} required style={styles.input} />
        <input type="file" name="Bus_image" accept="image/*" onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.button}>Update Bus</button>
      </form>
    </div>
  );
};

const DeleteBusForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();
  const [busId, setBusId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/bus/delete/${busId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Bus Deleted Successfully!");
        navigate("/admin/buses");
      } else {
        toast.error(data.message || "Failed to delete bus");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Delete Bus</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Bus ID" value={busId} onChange={(e) => setBusId(e.target.value)} required style={styles.input} />
        <button type="submit" style={{ ...styles.button, backgroundColor: "#dc3545" }}>Delete Bus</button>
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

export { UpdateBusForm, DeleteBusForm };
