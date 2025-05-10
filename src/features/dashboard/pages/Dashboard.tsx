import WeekCalendar from "@/features/dashboard/components/WeekCalendar";
import TodayTaskCard from "@/features/dashboard/components/TodayTaskCard";
import TaskCardList from "@/features/dashboard/components/TaskCard";
import DashboardHeader from "@/features/dashboard/components/Header";
import ContributionGraph from "@/features/dashboard/components/ContributionGraph";
import UserProfileCard from "@/features/dashboard/components/UserProfileCard";
import RankingCard from "@/features/dashboard/components/RankingCard";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchLeaderboardData} from "@/redux/rank/actions/rank.actions.ts";

export default function Dashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchLeaderboardData() as any);
    }, [dispatch]);
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
