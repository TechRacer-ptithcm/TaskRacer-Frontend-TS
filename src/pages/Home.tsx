import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Layout from "@/layout";
import Calendar from "./Cleandar";
import Pomodoro from "./Pomodoro";
import Dashboard from "./Dashboard";
import Chat from "./Chat";
import { Edit } from "lucide-react";
import EditUser from "./edtit-user";
import Rank from "./Rank";

const Main = () => {
  const page = useSelector((state: RootState) => state.page.currentPage);

  const renderPage = () => {
    switch (page) {
      case "calendar":
        return <Calendar />;
      case "pomodoro":
        return <Pomodoro />;
      case "dashboard":
        return <Dashboard />;
      case "chat":
        return <Chat />;
      case "rank":
        return <Rank />;
      case "edit-user":
        return <EditUser />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

export default Main;
