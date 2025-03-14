import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import ForgotPassword from "@/components/auth/ForgotPassword";

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

      <div className="flex w-1/2 items-center justify-center bg-white"></div>
    </div>
  );
}
