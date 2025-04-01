import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Calendar from "./pages/Cleandar";
import Auth from "./pages/Auth";
import AuthHandler from "./components/auth/AuthHandler";
import Dashboard from "./pages/Dashboard";
import Pomodoro from "./pages/Pomodoro";

export default function App() {
  return (
    <>
      <Router>
        {/* <AuthHandler /> */}
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/home/calendar"
            element={
              <Layout>
                <Calendar />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/home/pomodoro"
            element={
              <Layout>
                <Pomodoro />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
