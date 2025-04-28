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
    const handleAuth = async () => {
      const path = location.pathname;
      const currentPage = path.split("/").pop() as "calendar" | "dashboard" | "pomodoro" | "profile" | "ranking" | "chat";
      
      if (!accessToken) {
        if (!path.startsWith("/auth") && path !== "/premium" && path !== "/") {
          navigate("/", { replace: true });
        }
        return;
      }

      try {
        await dispatch(refreshToken());
        await dispatch(fetchUserData());
        await dispatch(fetchTasks());

        if (!active) {
          navigate("/auth/verify-account", { replace: true });
        } else if (!name || !gender || !birth) {
          navigate("/auth/user-info", { replace: true });
        } else {
          if (currentPage && ["calendar", "dashboard", "pomodoro", "profile", "ranking", "chat"].includes(currentPage)) {
            dispatch(setPage(currentPage));
          }

          if (path === "/" || path.startsWith("/auth")) {
            navigate("/home/dashboard", { replace: true });
          }
        }
      } catch (error) {
        console.error("Auth handling error:", error);
      }
    };

    handleAuth();
  }, [accessToken, active, name, gender, birth]);

  return null;
};

export default AuthHandler;
