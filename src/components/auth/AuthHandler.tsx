import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";

const AuthHandler = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/calendar");
    }
  }, [accessToken, navigate]);

  return null;
};

export default AuthHandler;
