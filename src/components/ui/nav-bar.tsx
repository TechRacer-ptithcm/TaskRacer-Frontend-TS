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
import {
  AlarmClock,
  CalendarCheck,
  FileText,
  Users,
  Trophy,
  BarChart3,
} from "lucide-react";
import {
  Brain,
  Users2,
  Lightbulb,
} from "lucide-react";

const products = [
  {
    title: "Pomodoro & Tập trung",
    icon: <AlarmClock className="mr-2 h-4 w-4" />,
  },
  {
    title: "Lịch học & Deadline",
    icon: <CalendarCheck className="mr-2 h-4 w-4" />,
  },
  {
    title: "Tài liệu học tập",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    title: "Học nhóm & Cộng đồng",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Game hóa học tập",
    icon: <Trophy className="mr-2 h-4 w-4" />,
  },
  {
    title: "Thống kê & Xếp hạng",
    icon: <BarChart3 className="mr-2 h-4 w-4" />,
  },
];

const solutions = [
  {
    title: "Tối ưu lịch học",
    icon: <Lightbulb className="mr-2 h-4 w-4" />,
  },
  {
    title: "Chế độ tập trung",
    icon: <Brain className="mr-2 h-4 w-4" />,
  },
  {
    title: "Học nhóm hiệu quả",
    icon: <Users2 className="mr-2 h-4 w-4" />,
  },
];

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center justify-center gap-2"
              onClick={() => window.location.reload()}
            >
              <img
                src={Logo}
                alt="TaskRacer Logo"
                className="h-12 w-12 rounded"
              />
              <h1 className="text-3xl font-bold text-[#FF3B30]">TaskRacer</h1>
            </a>
            <div className="ml-2 hidden border-l border-gray-200 pl-2 text-xs text-gray-500 md:block">
              Ứng dụng tất cả
              <br />
              cho công việc
            </div>
          </div>

          <nav className="hidden items-center space-x-1 md:flex">
            <NavItem title="Sản phẩm" items={products} />
            <NavItem title="Giải pháp" items={solutions} />
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

function NavItem({
  title,
  items,
}: {
  title: string;
  items: { title: string; icon: React.ReactNode }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
          {title} <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {items.map((item, index) => (
          <DropdownMenuItem key={index} className="flex items-center gap-2">
            {item.icon}
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
