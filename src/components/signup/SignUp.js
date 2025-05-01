import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
import api from "../../api";

function SignUp() {
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const otpInput = useRef();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Send OTP
  const sendOtp = async () => {
    try {
      let email = emailInput.current.value;
      if (!email) {
        toast.error("Please enter your email first!");
        return;
      }

      setIsLoading(true);
      await axios.post(api.SEND_OTP, { email });

      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (err) {
      toast.error("Failed to send OTP. Try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Handle Signup Submission (Now Verifies OTP Too)
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let username = nameInput.current.value;
      let email = emailInput.current.value;
      let password = passwordInput.current.value;
      let enteredOtp = otpInput.current?.value.trim(); // Get OTP input

      if (!otpSent) {
        toast.error("Please request OTP first!");
        return;
      }
      if (!enteredOtp) {
        toast.error("Please enter OTP!");
        return;
      }

      console.log("📩 Verifying OTP:", enteredOtp, "| Type:", typeof enteredOtp);

      // 🔹 Verify OTP & Register User in one request
      let response = await axios.post(api.VERIFY_OTP, {
        email,
        otp: String(enteredOtp), // Ensure it's a string
        username,
        password,
      });

      toast.success(response.data.message);
      navigate("/"); // Redirect to login or home page
    } catch (err) {
      toast.error("Invalid OTP. Please try again.");
      console.error("❌ Error in handleSubmit:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-container">
        <div className="form-container">
          <div className="form-header">
            <label className="form-title">Sign Up</label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input ref={nameInput} type="text" placeholder="Enter your name" className="form-control" required />
            </div>
            <div className="form-group">
              <input ref={emailInput} type="email" placeholder="Enter your email" className="form-control" required />
            </div>
            <div className="form-group">
              <input ref={passwordInput} type="password" placeholder="Create a strong password" className="form-control" required />
            </div>

            {/* 🔹 OTP Input Field (No verify button) */}
            {otpSent && (
              <div className="form-group">
                <input ref={otpInput} type="text" placeholder="Enter OTP" className="form-control" required />
              </div>
            )}

            {/* 🔹 Resend OTP Link */}
            {!otpSent ? (
              <button type="button" className="btn btn-secondary" onClick={sendOtp} disabled={isLoading}>
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <p className="text-center">
                Didn't receive OTP? <span className="resend-otp" onClick={sendOtp}>Resend OTP</span>
              </p>
            )}

            {/* 🔹 Submit Button (Now Verifies OTP too) */}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <div className="text-center mt-3">
              <Link to="/user/login">
                <label className="text-link">Already have an account?</label>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
