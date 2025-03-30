"use client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Logo from "@/assets/TaskRacerLogo.png";
import { useDispatch } from "react-redux";
import { setStep } from "@/redux/auth/authSlice";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center">
            <button onClick={() => navigate("/")} className="flex items-center">
              <img src={Logo} alt="TaskRacer Logo" className="mr-2 h-8 w-8" />
              <span className="text-xl font-bold text-[#1E1A34]">
                TaskRacer
              </span>
            </button>
            <div className="ml-2 hidden border-l border-gray-200 pl-2 text-xs text-gray-500 md:block">
              Ứng dụng tất cả
              <br />
              cho công việc
            </div>
          </div>

          <nav className="hidden items-center space-x-1 md:flex">
            <NavItem title="Sản phẩm" />
            <NavItem title="Giải pháp" />
            <NavItem title="Tài nguyên" />
            <Button
              variant="ghost"
              onClick={() => navigate("/premium")}
              className="px-3 py-2 text-gray-700 hover:text-gray-900"
            >
              Bảng giá
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => {
                dispatch(setStep("signIn"));
                navigate("/auth");
              }}
              className="hidden font-medium text-gray-700 hover:text-gray-900 md:inline-flex"
            >
              Đăng nhập
            </Button>
            <Button
              className="rounded-md bg-gradient-to-r from-[#FF3B30] to-[#cc9600] px-6 py-2 font-semibold text-white transition-all hover:brightness-110"
              onClick={() => {
                dispatch(setStep("signUp"));
                navigate("/auth");
              }}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ title }: { title: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
          {title} <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem>Tùy chọn 1</DropdownMenuItem>
        <DropdownMenuItem>Tùy chọn 2</DropdownMenuItem>
        <DropdownMenuItem>Tùy chọn 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
