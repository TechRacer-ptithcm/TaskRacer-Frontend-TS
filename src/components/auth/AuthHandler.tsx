import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchUserData } from "@/redux/user/user.slice";
import { refreshToken, setStep } from "@/redux/auth/authSlice";
import { fetchTasks } from "@/redux/calendar/task.slice";
import { setPage } from "@/redux/page/pageSlice";

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const accessToken: string | null = localStorage.getItem("accessToken");

  const { name, gender, birth, active } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    // Lấy currentPage từ URL path
    const path = location.pathname;
    const currentPage = path.split("/").pop() as "calendar" | "dashboard" | "pomodoro" | "profile" | "ranking" | "chat";
    
    if (!accessToken) {
      if (location.pathname !== "/auth" && location.pathname !== "/premium") {
        navigate("/");
      }
    } else {
      dispatch(refreshToken());
      dispatch(fetchUserData());
      dispatch(fetchTasks());
if (!active) {
        dispatch(setStep("verifyAccount"));
        if (location.pathname !== "/auth" && location.pathname !== "/premium") {
          navigate("/auth");
        }
      } else if (!name || !gender || !birth) {
        dispatch(setStep("userInfo"));
        if (location.pathname !== "/auth" && location.pathname !== "/premium") {
          navigate("/auth");
        }
      } else {
        // Cập nhật currentPage trong Redux store dựa trên URL
        if (currentPage && ["calendar", "dashboard", "pomodoro", "profile", "ranking", "chat"].includes(currentPage)) {
          dispatch(setPage(currentPage));
        }

        if (location.pathname === "/" || location.pathname === "/auth") {
          navigate("/home/dashboard");
        } else {
          // Giữ nguyên URL hiện tại nếu hợp lệ
          navigate(location.pathname);
        }
      }
    }
  }, [accessToken, active, name, gender, birth, dispatch, navigate, location.pathname]);

  return null;
};

export default AuthHandler;
