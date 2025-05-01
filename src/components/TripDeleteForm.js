import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TripDeleteForm = () => {
  const adminToken = useSelector((state) => state.adminAuth.adminToken);
  const navigate = useNavigate();
  const [tripId, setTripId] = useState("");

  const handleChange = (e) => {
    setTripId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminToken) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/trip/delete/${tripId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Trip Deleted Successfully!", { position: "top-center" });
        setTripId("");
        setTimeout(() => {
          window.alert("Trip deleted successfully");
          toast.success("Trip deleted successfully");
          navigate("/trip/list"); // Redirect to trip list page
        }, 3000);
      } else {
        toast.error(data.error || "Failed to delete trip!");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Delete a Trip</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="trip_id"
          placeholder="Trip ID"
          value={tripId}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" disabled={!tripId} style={styles.button}>
          Delete Trip
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TripDeleteForm;
