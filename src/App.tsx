import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import AuthHandler from "./components/auth/AuthHandler";
import Premium from "./pages/Premium";
import Main from "./pages/Home";
import Home from "./pages/LandingPage";

export default function App() {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}
