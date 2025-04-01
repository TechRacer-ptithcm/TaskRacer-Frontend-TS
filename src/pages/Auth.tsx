import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import PremiumList from "@/components/ui/premium-list";
import ForgotPassword from "@/components/auth/ForgotPassword";
import VerifyEmail from "@/components/auth/VerifyEmail";
import ResetPassword from "@/components/auth/ResetPassword";
import AuthHandler from "@/components/auth/AuthHandler";
import UserInfo from "@/components/auth/UserInfo";
const freeFeatures = [
  { text: "Quản lý thời gian", available: true },
  { text: "Pomodoro", available: true },
  { text: "Tham gia học nhóm", available: true },
  { text: "Không giới hạn lưu trữ tài liệu", available: false },
  { text: "AI hỗ trợ sắp xếp lịch", available: false }
];

const proFeatures = [
  { text: "Quản lý thời gian", available: true },
  { text: "Pomodoro", available: true },
  { text: "Tham gia học nhóm", available: true },
  { text: "Không giới hạn lưu trữ tài liệu", available: true },
  { text: "AI hỗ trợ sắp xếp lịch", available: true }
];

export default function Auth() {
  const step = useSelector((state: RootState) => state.auth.step);

  return (
    <>
      <AuthHandler />
      <div className="flex h-screen flex-col md:flex-row">
        <div className="flex w-full flex-1 items-center justify-center bg-gray-100 px-5">
          {step === "signIn" && <SignIn />}
          {step === "signUp" && <SignUp />}
          {step === "forgotPassword" && <ForgotPassword />}
          {step === "verifyAccount" && <VerifyEmail />}
          {step === "verifyResetPassword" && <VerifyEmail />}
          {step === "resetPassword" && <ResetPassword />}
          {step === "userInfo" && <UserInfo />}
        </div>

        <div className="hidden items-center justify-center md:flex">
          <div className="h-3/4 w-[2px] bg-gray-300"></div>
        </div>

        <div className="hidden w-1/2 items-center justify-center gap-2 bg-gray-100 md:flex">
          <PremiumList title="Miễn phí" features={freeFeatures} />
          <PremiumList title="Pro" features={proFeatures} />
        </div>
      </div>
    </>
  );
}
