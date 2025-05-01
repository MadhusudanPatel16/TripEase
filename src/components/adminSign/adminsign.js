import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { adminLoginSuccess } from "../../redux-config/slices/adminAuthSlice"; // ✅ Redux Action Import
import api from "../../api";
import Navbar from "../navbar/Navbar";
import "./adminSignIn.css";

function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch(); // ✅ Redux Dispatch
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post(api.AdminSign, { email, password });
      const token = response.data.token;

      // ✅ Token Store in Redux & LocalStorage
      dispatch(adminLoginSuccess(token));
      localStorage.setItem("authToken", token);

      toast.success("Sign in successful!");
      navigate("/admin/home");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="signin-container">
        <div className="form-container">
          <div className="form-header">
            <label>Sign In</label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter your email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Enter your password"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <button disabled={!email || !password} type="submit" className="btn-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminSignIn;
