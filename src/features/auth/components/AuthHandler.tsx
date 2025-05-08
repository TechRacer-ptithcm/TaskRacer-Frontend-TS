import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchUserData } from "@/redux/user/user.slice";
import { refreshToken } from "@/redux/auth/authSlice";
import { fetchTasks } from "@/redux/calendar/task.slice";
import { setPage } from "@/redux/page/pageSlice";
import { Loading } from "@/features/layout/components/Loading";

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const accessToken: string | null = localStorage.getItem("accessToken");

  const [isResolvingAuth, setIsResolvingAuth] = useState(true);

  const { name, gender, birth, active, email } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    const performAuthResolution = async (): Promise<boolean> => {
      const path = location.pathname;
      const currentPage = path.split("/").pop() as "calendar" | "dashboard" | "pomodoro" | "profile" | "ranking" | "chat";

      if (!accessToken || !email) {
        if (!path.startsWith("/auth") && path !== "/premium" && path !== "/") {
          navigate("/", { replace: true });
          return true;
        }
        return false;
      }

      try {
        await dispatch(refreshToken());
        await dispatch(fetchUserData());
        await dispatch(fetchTasks());
        console.log(active )
        if (!active && email) {
          setIsResolvingAuth(false)
          navigate("/auth/verify-account", { replace: true });
          return false;
        }
        if (!name || !gender || !birth ) {
          console.log("user info not submitted", name, gender, birth)
          navigate("/auth/user-info", { replace: true });
          return false;
        }

        if (currentPage && ["calendar", "dashboard", "pomodoro", "profile", "ranking", "chat"].includes(currentPage)) {
          dispatch(setPage(currentPage));
        }

        if (path === "/" || path.startsWith("/auth")) {
          navigate("/home/dashboard", { replace: true });
          return true;
        }

        return false;
      } catch (error) {
        console.error("Auth handling error:", error);

        localStorage.removeItem("accessToken");

        navigate("/", { replace: true });
        return true;
      }
    };

    performAuthResolution().then((stillResolving) => {
      setIsResolvingAuth(stillResolving);
    });

  }, [accessToken, active, name, gender, birth, dispatch, location.pathname, navigate]);

  if (isResolvingAuth) {
    return <Loading />;
  }

  return null;
};

export default AuthHandler;
