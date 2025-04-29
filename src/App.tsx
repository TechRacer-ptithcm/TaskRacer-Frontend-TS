import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./features/auth/pages/Auth";
import AuthHandler from "./features/auth/components/AuthHandler";
import Premium from "@/features/premium/pages/Premium";
import Home from "./features/landing/pages/LandingPage";
import Calendar from "./features/calendar/pages/CalendarPage";
import Pomodoro from "@/features/pomodoro/pages/Pomodoro";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import Chat from "@/features/chat/pages/Chat";
import Rank from "@/features/rank/pages/Rank";
import ProfilePage from "@/features/profile/pages/Profile";
import TaskManagement from "./features/todo/pages/Todo";
import Layout from "@/features/layout/MainLayout";
import AuthLayout from "./features/layout/AuthLayout";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import PostFeed from "@/features/postFeed/pages/PostFeed";

export default function App() {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/auth/*" element={<Auth />} />
        </Route>
        <Route path="/premium" element={<Premium />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/home/dashboard" element={<Dashboard />} />
            <Route path="/home/calendar" element={<Calendar />} />
            <Route path="/home/pomodoro" element={<Pomodoro />} />
            <Route path="/home/chat" element={<Chat />} />
            <Route path="/home/ranking" element={<Rank />} />
            <Route path="/home/profile" element={<ProfilePage />} />
            <Route path="/home/todo" element={<TaskManagement />} />
            <Route path="/home/post" element={<PostFeed />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
