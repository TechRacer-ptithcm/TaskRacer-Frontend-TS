import Layout from "@/layout";
import Calendar from "./Cleandar";
import Pomodoro from "./Pomodoro";
import Dashboard from "./Dashboard";
import ProfilePage from "./Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Main = () => {
  const page = useSelector((state: RootState) => state.page.currentPage);

  return <Layout />;
};

export default Main;
