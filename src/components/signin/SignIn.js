import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import api from "../../api";
import { setUser } from "../../redux-config/UserSlice";
import Navbar from "../navbar/Navbar";
import "./SignIn.css"; // Import the CSS file

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Handle Sign-In
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post(api.SIGN_IN, { email, password });
  
      console.log("✅ Login Response:", response.data); // ✅ Check API Response
  
      localStorage.setItem("authToken", response.data.token);


      dispatch(setUser({
        user: response.data.user,
        token: response.data.token
      })); // ✅ Redux me user bhejne ki koshish
      console.log("✅ Dispatched setUser:", response.data.user); // ✅ Check Redux Dispatch
      console.log("✅ Dispatched setUser:", response.data.token); // ✅ Check Redux Dispatch

      toast.success("Sign in successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  // 🔹 Send OTP for Password Reset
  const handleSendOtp = async () => {
    try {
      if (!email) {
        toast.error("Please enter your email first!");
        return;
      }
      await axios.post(api.SEND_OTP, { email });
      setOtpSent(true);
      toast.success("OTP sent to your email!");
    } catch (err) {
      toast.error("Failed to send OTP. Try again.");
      console.error(err);
    }
  };

  // 🔹 Verify OTP & Reset Password
  const handleResetPassword = async () => {
    try {
      if (!otp || !newPassword) {
        toast.error("Enter OTP and new password!");
        return;
      }
      await axios.post(api.RESET_PASSWORD, { email, otp, newPassword });
      toast.success("Password reset successful! Please login.");
      setIsForgotPassword(false);
      setOtpSent(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error("Invalid OTP. Try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="signin-container">
        <div className="form-container">
          <div className="form-header">
            <label>{isForgotPassword ? "Reset Password" : "Sign In"}</label>
          </div>

          {!isForgotPassword ? (
            // 🔹 Sign-In Form
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
              <div className="form-footer">
                <Link to="/user/register">
                  <label className="text-link">Create new account?</label>
                </Link>
                <label className="text-secondary" onClick={() => setIsForgotPassword(true)}>
                  Forgot password?
                </label>
              </div>
            </form>
          ) : (
            // 🔹 Forgot Password Form
            <div>
              <div className="form-group">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                  required
                  disabled={otpSent}
                />
              </div>
              {!otpSent ? (
                <button className="btn btn-secondary" onClick={handleSendOtp}>
                  Send OTP
                </button>
              ) : (
                <>
                  <div className="form-group">
                    <input
                      value={otp}
                      onChange={(event) => setOtp(event.target.value)}
                      type="text"
                      placeholder="Enter OTP"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      type="password"
                      placeholder="Enter new password"
                      className="form-control"
                      required
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleResetPassword}>
                    Reset Password
                  </button>
                </>
              )}
              <p className="text-center mt-3">
                <span className="text-link" onClick={() => setIsForgotPassword(false)}>
                  Back to Sign In
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SignIn;
