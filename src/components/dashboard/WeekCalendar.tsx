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
import { Add, MoreHoriz } from "@mui/icons-material";
import { IconButton } from "@mui/material";

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

  return (
    <div className="rounded-3xl bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold">March</h3>
        <Button
          variant="ghost"
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
        <div className="flex">
          <div className="w-16 font-['Baloo_2',sans-serif] text-gray-500">
            09:00
          </div>
        </div>

        <div className="flex">
          <div className="w-16 font-['Baloo_2',sans-serif] text-gray-500">
            10:00
          </div>
          <div className="relative flex-1">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-red-600"></div>
            <div className="ml-6 rounded-lg bg-white p-3 shadow-sm">
              <div className="flex justify-between">
                <h4 className="font-['Baloo_2',sans-serif] font-bold">
                  UI Motion
                </h4>
                <IconButton size="small">
                  <MoreHoriz fontSize="small" />
                </IconButton>
              </div>
              <p className="text-sm text-gray-500">10:00am - 12:00pm</p>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="w-16 font-['Baloo_2',sans-serif] text-gray-500">
            11:00
          </div>
        </div>

        <div className="flex">
          <div className="w-16 font-['Baloo_2',sans-serif] text-gray-500">
            12:00
          </div>
          <div className="relative flex-1">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-red-600"></div>
            <div className="ml-6 rounded-lg bg-white p-3 shadow-sm">
              <div className="flex justify-between">
                <h4 className="font-['Baloo_2',sans-serif] font-bold">
                  UI Design
                </h4>
                <IconButton size="small">
                  <MoreHoriz fontSize="small" />
                </IconButton>
              </div>
              <p className="font-['Baloo_2',sans-serif] text-sm text-gray-500">
                12:00pm - 01:00pm
              </p>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="w-16 font-['Baloo_2',sans-serif] text-gray-500">
            01:00
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekCalendar;
