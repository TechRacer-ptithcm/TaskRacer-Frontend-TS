import {
  AlarmClock,
  CalendarCheck,
  FileText,
  Users,
  Trophy,
  BarChart3,
  Brain,
  Users2,
  Lightbulb,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface NavigationItem {
  title: string;
  icon: LucideIcon;
}

export const products: NavigationItem[] = [
  {
    title: "Pomodoro & Tập trung",
    icon: AlarmClock
  },
  {
    title: "Lịch học & Deadline",
    icon: CalendarCheck
  },
  {
    title: "Tài liệu học tập",
    icon: FileText
  },
  {
    title: "Học nhóm & Cộng đồng",
    icon: Users
  },
  {
    title: "Game hóa học tập",
    icon: Trophy
  },
  {
    title: "Thống kê & Xếp hạng",
    icon: BarChart3
  }
];

export const solutions: NavigationItem[] = [
  {
    title: "Tối ưu lịch học",
    icon: Lightbulb
  },
  {
    title: "Chế độ tập trung",
    icon: Brain
  },
  {
    title: "Học nhóm hiệu quả",
    icon: Users2
  }
];