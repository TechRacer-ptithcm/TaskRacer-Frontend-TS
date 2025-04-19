import { Fragment } from "react";
import { Avatar, IconButton } from "@mui/material";
import { Add, MoreHoriz } from "@mui/icons-material";
import * as d3 from "d3";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import fire from "@/assets/Fire.json";
import Lottie from "lottie-react";
import { getLastInitial } from "@/utils/name";
import WeekCalendar from "@/components/dashboard/WeekCalendar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { name, streak } = useSelector((state: RootState) => state.user);
  const year = 2025;
  const startDate = new Date(year, 0, 1);

  const sampleData = Array.from({ length: 365 }, (_, i) => {
    const d = new Date(2025, 0, 1);
    d.setDate(d.getDate() + i);
    return {
      date: d,
      value: Math.floor(Math.random() * 5),
    };
  });
  const dataMap = new Map(
    sampleData.map((d) => [d3.timeFormat("%Y-%m-%d")(d.date), d.value]),
  );

  const getColor = (value?: number): string => {
    if (!value) return "bg-gray-200";
    if (value < 2) return "bg-green-200";
    if (value < 4) return "bg-green-400";
    return "bg-green-600";
  };
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main Content - 2/3 width */}
      <div className="space-y-6 lg:col-span-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="mt-5">
            <h1 className="font-['Baloo_2',sans-serif] text-3xl font-bold text-[#4B4E6D]">
              Hi, {name}
            </h1>

            <p className="font-['Baloo_2',sans-serif] text-xl text-[#4B4E6D]">
              Let's finish your task today!
            </p>
          </div>
        </div>

        {/* Today Task Card */}
        <div className="flex justify-between rounded-3xl bg-white p-6">
          <div className="space-y-4">
            <h2 className="font-['Baloo_2',sans-serif] text-4xl font-bold text-red-500">
              Today Task
            </h2>
            <p className="font-['Baloo_2',sans-serif] text-lg text-red-500">
              Check your daily tasks and schedules
            </p>
            <button className="rounded-full bg-[#ff5470] px-6 py-3 font-['Baloo_2',sans-serif] font-medium text-white shadow-md">
              Today's schedule
            </button>
          </div>
          <div className="hidden md:block">
            <img
              src="src\assets\isometric-university-concept-background.png"
              alt="Task illustration"
              className="h-48"
            />
          </div>
        </div>

        {/* Task Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Web Dashboard Card */}
          <div className="rounded-3xl bg-white p-5 shadow-[4px_8px_10px_0px_rgba(149,_157,_165,_0.2)]">
            <div className="mb-2 flex items-center justify-between font-['Baloo_2',sans-serif] text-gray-400">
              <span>Mar 2, 2024</span>
              <IconButton size="small">
                <MoreHoriz fontSize="small" />
              </IconButton>
            </div>
            <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold text-[#4B4D6E]">
              Web Dashboard
            </h3>
            <p className="font-['Baloo_2',sans-serif] text-gray-500">
              Designing
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                <Avatar
                  sx={{ width: 32, height: 32, border: "2px solid white" }}
                >
                  K
                </Avatar>
                <Avatar
                  sx={{ width: 32, height: 32, border: "2px solid white" }}
                >
                  N
                </Avatar>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full bg-pink-100 p-1">
                  <Add className="text-pink-600" fontSize="small" />
                </button>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-600">
                  3 days left
                </span>
              </div>
            </div>
          </div>

          {/* Mobile App Card */}
          <div className="rounded-3xl bg-white p-5 shadow-[4px_8px_10px_0px_rgba(149,_157,_165,_0.2)]">
            <div className="mb-2 flex items-center justify-between font-['Baloo_2',sans-serif] text-gray-400">
              <span>Mar 6, 2024</span>
              <IconButton size="small">
                <MoreHoriz fontSize="small" />
              </IconButton>
            </div>
            <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold text-[#4B4D6E]">
              Mobile App
            </h3>
            <p className="font-['Baloo_2',sans-serif] text-gray-500">
              Shopping
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                <Avatar
                  sx={{ width: 32, height: 32, border: "2px solid white" }}
                >
                  K
                </Avatar>
                <Avatar
                  sx={{ width: 32, height: 32, border: "2px solid white" }}
                >
                  N
                </Avatar>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full bg-pink-100 p-1">
                  <Add className="text-pink-600" fontSize="small" />
                </button>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-600">
                  25 days left
                </span>
              </div>
            </div>
          </div>

          {/* Animation Card */}
          <div className="rounded-3xl bg-white p-5 shadow-[4px_8px_10px_0px_rgba(149,_157,_165,_0.2)]">
            <div className="mb-2 flex items-center justify-between font-['Baloo_2',sans-serif] text-gray-400">
              <span>Mar 8, 2024</span>
              <IconButton size="small">
                <MoreHoriz fontSize="small" />
              </IconButton>
            </div>
            <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold text-[#4B4D6E]">
              Animation
            </h3>
            <p className="font-['Baloo_2',sans-serif] text-gray-500">
              Designing
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                <Avatar
                  sx={{ width: 32, height: 32, border: "2px solid white" }}
                >
                  K
                </Avatar>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full bg-pink-100 p-1">
                  <Add className="text-pink-600" fontSize="small" />
                </button>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-600">
                  7 days left
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Graph */}
        <div className="mt-15 rounded-3xl bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Contribution Calendar - {year}
          </h2>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[40px_repeat(53,1fr)] gap-1">
              <div></div>
              {Array.from({ length: 53 }).map((_, i) => (
                <div key={i} className="text-center text-xs text-gray-400">
                  {i % 4 === 0
                    ? d3.timeFormat("%b")(d3.timeWeek.offset(startDate, i))
                    : ""}
                </div>
              ))}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, dayIdx) => (
                  <Fragment key={day}>
                    <div className="pr-2 text-right text-xs text-gray-400">
                      {day}
                    </div>
                    {Array.from({ length: 53 }).map((_, weekIdx) => {
                      const date = d3.timeWeek.offset(startDate, weekIdx);
                      date.setDate(date.getDate() + dayIdx);
                      if (date.getFullYear() !== year)
                        return <div key={weekIdx}></div>;
                      const key = d3.timeFormat("%Y-%m-%d")(date);
                      const value = dataMap.get(key);
                      return (
                        <div
                          key={weekIdx}
                          className={`h-4 w-4 rounded ${getColor(value)}`}
                          title={`${key}: ${value || 0}`}
                        ></div>
                      );
                    })}
                  </Fragment>
                ),
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Less</span>
              <div className="flex gap-1">
                <div className="h-4 w-4 rounded bg-gray-200"></div>
                <div className="h-4 w-4 rounded bg-green-200"></div>
                <div className="h-4 w-4 rounded bg-green-400"></div>
                <div className="h-4 w-4 rounded bg-green-600"></div>
              </div>
              <span className="text-sm text-gray-500">More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - 1/3 width */}
      <div className="space-y-6">
        {/* User Profile */}
        <div className="rounded-3xl bg-white p-6">
          <div className="flex items-center gap-4">
            <Avatar sx={{ ml: 2, bgcolor: "#4caf50", width: 40, height: 40 }}>
              {getLastInitial(name)}
            </Avatar>
            <div>
              <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold">
                {name}
              </h3>
              <p className="font-['Baloo_2',sans-serif] text-gray-500">
                UI/Design
              </p>
            </div>
            <div className="mr-7 ml-auto flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-8 w-8 -translate-y-3 transform">
                  <Lottie animationData={fire} loop autoplay />
                </div>
                <span className="font-['Baloo_2',sans-serif] text-2xl font-bold text-amber-500">
                  {streak}
                </span>
              </div>
            </div>
          </div>
        </div>

        <WeekCalendar />

        {/* Ranking */}
        <div className="rounded-3xl bg-white px-6 py-3">
          <div className="mb-4 flex justify-center">
            <h3 className="flex items-center gap-2 font-['Baloo_2',sans-serif] text-2xl font-bold">
              Ranking
              <span className="text-3xl">🏆</span>
            </h3>
          </div>

          {/* Ranking Item 1 */}
          <div className="mb-3 flex items-center rounded-xl bg-[#FFF2F2] p-4">
            <div className="mr-2 text-4xl text-amber-500">🥇</div>
            <img
              src="src\assets\image.png"
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-3">
              <h4 className="font-['Baloo_2',sans-serif] font-bold">Chây 97</h4>
              <p className="flex items-center text-xs text-amber-500">
                <span className="mr-1 text-xl">🔥</span> 684 ngày
              </p>
            </div>
            <div className="ml-auto">
              <img
                src="src\assets\diamond-svgrepo-com.svg"
                alt=""
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>

          {/* Ranking Item 2 */}
          <div className="mb-3 flex items-center rounded-xl bg-[#FFF2F2] p-4">
            <div className="mr-2 text-4xl text-gray-400">🥈</div>
            <Avatar sx={{ width: 40, height: 40 }}>H</Avatar>
            <div className="ml-3">
              <h4 className="font-['Baloo_2',sans-serif] font-bold">Vi rút</h4>
              <p className="flex items-center text-xs text-amber-500">
                <span className="mr-1 text-xl">🔥</span> 332 ngày
              </p>
            </div>
            <div className="ml-auto">
              <img
                src="src\assets\gold-medal-svgrepo-com.svg"
                alt=""
                className="w8 h-8 rounded-full"
              />
            </div>
          </div>

          {/* Ranking Item 3 */}
          <div className="mb-3 flex items-center rounded-xl bg-[#FFF2F2] p-4">
            <div className="mr-2 text-4xl text-amber-700">🥉</div>
            <Avatar sx={{ width: 40, height: 40 }}>Đ</Avatar>
            <div className="ml-3">
              <h4 className="font-['Baloo_2',sans-serif] font-bold">
                Lép Đích
              </h4>
              <p className="flex items-center text-xs text-amber-500">
                <span className="mr-1 text-xl">🔥</span> 100 ngày
              </p>
            </div>
            <div className="ml-auto">
              <img
                src="src\assets\gold-medal-svgrepo-com.svg"
                alt=""
                className="w8 h-8 rounded-full"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              className="rounded-full bg-white px-6 py-2 font-['Baloo_2',sans-serif] font-medium text-gray-600 shadow-sm"
              onClick={() => navigate("/home/ranking")}
            >
              See all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
