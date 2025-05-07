import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ForgotPassword from "../components/ForgotPassword";
import VerifyEmail from "../components/VerifyEmail";
import ResetPassword from "../components/ResetPassword";
import UserInfo from "../components/UserInfo";

export default function Auth() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-account" element={<VerifyEmail />} />
      <Route path="/verify-reset-password" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/user-info" element={<UserInfo />} />
    </Routes>
  );
}
