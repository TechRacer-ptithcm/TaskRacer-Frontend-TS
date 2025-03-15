import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import PremiumList from "@/components/ui/premium-list";

const freeFeatures = [
  { text: "Quản lý thời gian", available: true },
  { text: "Pomodoro", available: true },
  { text: "Tham gia học nhóm", available: true },
  { text: "Không giới hạn lưu trữ tài liệu", available: false },
  { text: "AI hỗ trợ sắp xếp lịch", available: false },
];

const proFeatures = [
  { text: "Quản lý thời gian", available: true },
  { text: "Pomodoro", available: true },
  { text: "Tham gia học nhóm", available: true },
  { text: "Không giới hạn lưu trữ tài liệu", available: true },
  { text: "AI hỗ trợ sắp xếp lịch", available: true },
];

export default function Auth() {
  const step = useSelector((state: RootState) => state.auth.step);

  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 flex-col items-center justify-center bg-gray-100">
        {step === "signIn" && <SignIn />}
        {step === "signUp" && <SignUp />}
        {/* {step === "forgotPassword" && (
          <ForgotPassword onChangeStep={(step) => dispatch(setStep(step))} />
        )} */}
      </div>

      <div className="flex items-center justify-center">
        <div className="h-3/4 w-[2px] bg-gray-300"></div>
      </div>

      <div className="flex w-1/2 items-center justify-center gap-2 bg-gray-100">
        <PremiumList title="Miễn phí" features={freeFeatures} />
        <PremiumList title="Pro" features={proFeatures} />
      </div>
    </div>
  );
}
