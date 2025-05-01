import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user); // Get user from Redux

  return user ? <Outlet /> : <Navigate to="/user/login" replace />;
};

export default ProtectedRoute;
