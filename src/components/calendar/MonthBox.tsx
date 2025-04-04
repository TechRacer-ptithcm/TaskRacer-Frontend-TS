import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { open } from "@/redux/calendar/popupCalen.slice";
import EventRenderer from "../ui/EventRenderer";
import { RootState } from "@/redux/store";

dayjs.locale("vi");

export default function MonthBox({
  date,
  rowIndex,
}: {
  date: dayjs.Dayjs;
  rowIndex: number;
}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const isToday = date.isSame(dayjs(), "day");

  const handleClick = () => {
    dispatch(open(date.toISOString()));
  };

  return (
    <div
      className="flex flex-col items-center border px-2 hover:bg-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      {rowIndex === 0 && (
        <h3 className="text-sm text-gray-500">
          {date.format("dd").toUpperCase()}
        </h3>
      )}
      <div
        className={`flex items-center justify-center text-center ${
          isToday ? "rounded-full bg-blue-500 text-white h-8 w-8" : ""
        } ${date.date() === 1 && !isToday ? "w-full rounded-none p-1" : "h-8 w-8 rounded-full"}`}
      >
        {date.date() === 1
          ? isToday
            ? date.format("D")
            : date.format("D [thg] M")
          : date.date()}
      </div>

      <div className="w-full mt-1">
        <EventRenderer date={date} />
      </div>
    </div>
  );
}
