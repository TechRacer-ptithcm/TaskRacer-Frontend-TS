import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import {
  resetToCurrentDate,
  setSelectedDate,
} from "@/redux/calendar/selectedDate.slide";
import { getWeekDays } from "@/utils/date";
import { useMemo } from "react";
import dayjs from "dayjs";
import { useRef, useEffect } from "react";
import { Add } from "@mui/icons-material";
import ScheduleItem from "./TaskDashBoard";
import { Task } from "@/redux/calendar/task.slice";
import PopUpCalen from "@/features/calendar/components/popup-calendar";
import EventSummary from "@/features/calendar/components/EventSummary";
import { openSummaryPopup } from "@/redux/calendar/popupSummary.slice";
import { open } from "@/redux/calendar/popupCalen.slice";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { prevWeek, nextWeek } from "@/redux/calendar/selectedDate.slide";
import TaskModalUI from "@/features/calendar/components/popup-edit";

const WeekCalendar = () => {
  const dispatch = useAppDispatch();

  const getVietnameseMonth = (selectedDate: string) => {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    const monthIndex = dayjs(selectedDate).month(); // 0-based
    return months[monthIndex];
  };

  const selectedDate = useSelector(
    (state: RootState) => state.selectedDate.selectedDate,
  );
  const isFirstRender = useRef(true);
  const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate]);
  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(resetToCurrentDate());
      isFirstRender.current = false;
    }
  }, [dispatch]);

  const tasks = useSelector((state: RootState) => state.task.tasks);

  const filteredEvents: Pick<
    Task,
    "id" | "title" | "start" | "end" | "description"
  >[] = tasks.filter((event) =>
    dayjs(event.start).isSame(dayjs(selectedDate), "day"),
  );

  return (
    <div className="rounded-3xl bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold">
            {getVietnameseMonth(selectedDate)}
          </h3>

          <IconButton onClick={() => dispatch(prevWeek())}>
            <ChevronLeft />
          </IconButton>

          <IconButton onClick={() => dispatch(nextWeek())}>
            <ChevronRight />
          </IconButton>
          <Button
            onClick={() => dispatch(resetToCurrentDate())}
            className="rounded-full bg-[#ff5470] px-6 py-3 font-['Baloo_2',sans-serif] font-medium text-white shadow-md hover:bg-[#e03a57]"
          >
            Hôm nay
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={() => dispatch(open(selectedDate))}
          className="flex items-center gap-1 p-0 text-sm text-red-600 hover:bg-transparent hover:text-red-600"
        >
          <Add fontSize="small" />
          Thêm nhiệm vụ
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-7 gap-2">
        {weekDays.map((day, i) => {
          const isActive = day.date.isSame(dayjs(selectedDate), "day");
          return (
            <div key={i} className="text-center">
              <Button
                variant="ghost"
                onClick={() =>
                  dispatch(setSelectedDate(day.date.toISOString()))
                }
                className={`h-10 w-10 rounded-full p-0 text-base ${
                  isActive
                    ? "bg-red-500 text-white hover:bg-red-500"
                    : "hover:text-[#ff5470]"
                }`}
              >
                {day.date.format("D")}
              </Button>

              <div className="mt-1 text-xs text-gray-500">
                {day.date.format("ddd")}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredEvents.map((task) => (
          <div
            key={task.id}
            onClick={() => dispatch(openSummaryPopup(task))}
            className="cursor-pointer"
          >
            <ScheduleItem
              title={task.title}
              start={task.start}
              end={task.end}
              description={task.description}
            />
          </div>
        ))}
      </div>

      <PopUpCalen />
      <EventSummary />
      <TaskModalUI />
    </div>
  );
};

export default WeekCalendar;
