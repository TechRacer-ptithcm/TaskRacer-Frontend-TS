import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchUserData } from "@/redux/user/user.slice";
import { setStep } from "@/redux/auth/authSlice";

const AuthHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken: string = localStorage.getItem("accessToken")!;
  const { name, gender, birth, userInfoSubmitted, active } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth");
    } else {
      dispatch(fetchUserData());
  
      if (!active) {
        dispatch(setStep("verifyAccount"));
      } else if (!name || !gender || !birth) {
        dispatch(setStep("userInfo"));
      } else if (userInfoSubmitted) {
        navigate("/calendar");
      }
    }
  }, [accessToken, active, name, gender, birth, userInfoSubmitted, dispatch, navigate]);
    

  return null;
};

export default AuthHandler;
