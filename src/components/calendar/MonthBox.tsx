import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

export default function MonthBox({
  date,
  rowIndex,
}: {
  date: dayjs.Dayjs;
  rowIndex: number;
}): React.JSX.Element {
  const isToday = date.isSame(dayjs(), "day");

  return (
    <div className="flex flex-col items-center border px-2 hover:bg-gray-200">
      {rowIndex === 0 && (
        <h3 className="text-sm text-gray-500">
          {date.format("dd").toUpperCase()}
        </h3>
      )}
      <div
        className={`flex items-center justify-center  text-center ${
          isToday ? "rounded-full bg-blue-500 text-white" : ""
        } ${date.date() === 1 ? "w-full rounded-none p-1" : "h-8 w-8 rounded-full"}`}
      >
        {date.date() === 1 ? date.format("D [thg] M") : date.date()}
      </div>
    </div>
  );
}
