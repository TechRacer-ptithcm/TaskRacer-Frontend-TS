import WeekCalendar from "@/components/dashboard/WeekCalendar";
import TodayTaskCard from "@/components/dashboard/TodayTaskCard";
import TaskCardList from "@/components/dashboard/TaskCard";
import DashboardHeader from "@/components/dashboard/Header";
import ContributionGraph from "@/components/dashboard/ContributionGraph";
import UserProfileCard from "@/components/dashboard/UserProfileCard";
import RankingCard from "@/components/dashboard/RankingCard";

export default function Dashboard() {
  return (
    <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main Content - 2/3 width */}
      <div className="space-y-6 lg:col-span-2">
        <DashboardHeader />
        <TodayTaskCard />
        <TaskCardList />
        <ContributionGraph />
      </div>

      {/* Sidebar - 1/3 width */}
      <div className="space-y-6">
        <UserProfileCard />
        <WeekCalendar />
        <RankingCard />
      </div>
    </div>
  );
}
