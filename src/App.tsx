import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Calendar from "./pages/Cleandar";
import Auth from "./pages/Auth";
import AuthHandler from "./components/auth/AuthHandler";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      <Router>
        <AuthHandler />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/calendar"
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
        </Routes>
      </Router>
    </>
  );
}
