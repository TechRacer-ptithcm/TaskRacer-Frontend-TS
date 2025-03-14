import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout';
import Calendar from './pages/Cleandar'
import Auth from './pages/Auth';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
      </Routes>
    </Router>
  );
}
