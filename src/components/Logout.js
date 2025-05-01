import { useDispatch } from "react-redux";
import { logoutUser } from "../redux-config/UserSlice";
import { clearBookings } from "../redux-config/slices/bookingSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()); // ✅ Redux se user hatao
    // dispatch(clearBookings()); // ✅ Bookings bhi clear karo
    navigate("/user/login"); // ✅ Redirect to Signin page
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default LogoutButton;
