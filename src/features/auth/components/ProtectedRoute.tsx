import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/redux/store";

const ProtectedRoute = () => {
  const { userInfoSubmitted, active } = useSelector(
    (state: RootState) => state.user
  );
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  if (!active) {
    return <Navigate to="/auth" replace />;
  }

  if (!userInfoSubmitted) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;