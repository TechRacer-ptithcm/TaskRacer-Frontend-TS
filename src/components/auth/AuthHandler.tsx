import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchUserData } from "@/redux/user/user.slice";
import { refreshToken, setStep } from "@/redux/auth/authSlice";
import { fetchTasks } from "@/redux/calendar/task.slice";

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const accessToken: string | null = localStorage.getItem("accessToken");

  const { name, gender, birth, userInfoSubmitted, active } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!accessToken) {
      if (location.pathname !== "/" && location.pathname !== "/auth" && location.pathname !== "/premium") {
        navigate("/");
      }
    } else {
      dispatch(refreshToken());
      dispatch(fetchUserData());
      dispatch(fetchTasks());

      if (!active) {
        dispatch(setStep("verifyAccount"));
        navigate("/auth");
      } else if (!name || !gender || !birth) {
        dispatch(setStep("userInfo"));
        navigate("/auth");
      } else if (userInfoSubmitted) {
        navigate("/calendar");
      }
    }
  }, [accessToken, active, name, gender, birth, userInfoSubmitted, dispatch, navigate, location.pathname]);

  return null;
};

export default AuthHandler;
