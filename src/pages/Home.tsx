import Layout from "@/layout";
import Calendar from "./Cleandar";
import Pomodoro from "./Pomodoro";
import Dashboard from "./Dashboard";
import ProfilePage from "./Profile";

const Main = () => {
  const page = useSelector((state: RootState) => state.page.currentPage);

  const renderPage = () => {
    switch (page) {
      case "calendar":
        return <Calendar />;
      case "pomodoro":
        return <Pomodoro />;
      case "profile":
        return <ProfilePage />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

export default Main;
