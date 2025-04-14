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
import PopUpCalen from "@/components/ui/popup-calendar";
import EventSummary from "../ui/EventSummary";
import { openSummaryPopup } from "@/redux/calendar/popupSummary.slice";
import { open } from "@/redux/calendar/popupCalen.slice";

const WeekCalendar = () => {
  const dispatch = useAppDispatch();
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

  const filteredEvents: Pick<Task, "id" | "title" | "start" | "end">[] =
    tasks.filter((event) =>
      dayjs(event.start).isSame(dayjs(selectedDate), "day"),
    );

  return (
    <div className="rounded-3xl bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold">March</h3>
        <Button
          variant="ghost"
          onClick={() => dispatch(open(selectedDate))}
          className="flex items-center gap-1 p-0 text-sm text-red-600 hover:bg-transparent hover:text-red-600"
        >
          <Add fontSize="small" />
          Add Task
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
              time={`${task.start.slice(11, 16)} - ${task.end.slice(11, 16)}`}
            />
          </div>
        ))}
      </div>

      <PopUpCalen />
      <EventSummary />
    </div>
  );
};

export default WeekCalendar;
