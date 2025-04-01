import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Layout from "@/layout";
import Calendar from "./Cleandar";
import Pomodoro from "./Pomodoro";
import Dashboard from "./Dashboard";

const Main = () => {
  const page = useSelector((state: RootState) => state.page.currentPage);

  const renderPage = () => {
    switch (page) {
      case "calendar":
        return <Calendar />;
      case "pomodoro":
        return <Pomodoro />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

export default Main;
