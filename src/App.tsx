import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import AuthHandler from "./components/auth/AuthHandler";
import Premium from "./pages/Premium";
import Home from "./pages/LandingPage";
import Calendar from "./pages/Cleandar";
import Pomodoro from "./pages/Pomodoro";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Rank from "./pages/Rank";
import ProfilePage from "./pages/Profile";
import Layout from "./layout";

export default function App() {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/premium" element={<Premium />} />

        <Route path="/home" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="chat" element={<Chat />} />
          <Route path="ranking" element={<Rank />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
