import logo from "../assets/TaskRacerLogo.png";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/nav-bar";
import { useAppDispatch } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { setStep } from "@/redux/auth/authSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-blue-50/50">
      <NavBar />

      <main className="flex flex-1">
        <section className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 text-center">
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold text-[#1E1A34] md:text-6xl">
            Hoàn thành dự án nhanh hơn 300%.
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-[#1E1A34]/80 md:text-xl">
            Ứng dụng “tất cả trong một” cho công việc. Một nơi duy nhất để các
            nhóm mọi quy mô giao tiếp và hoàn thành công việc.
          </p>

          <div className="flex flex-col items-center">
            <Button
              className="h-auto rounded-full bg-gradient-to-r from-[#FF3B30] to-[#cc9600] px-8 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
              onClick={() => {
                dispatch(setStep("signUp"));
                navigate("/auth");
              }}
            >
              Bắt đầu ngay. Miễn phí 100%!
            </Button>
            <p className="mt-3 text-sm text-gray-500">
              Miễn phí mãi mãi. Không cần thẻ tín dụng.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
