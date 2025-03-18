import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ScrollArea } from "../ui/scroll-area";
import dayjs from "dayjs";
import { get24Hours } from "@/utils/date";
import { RootState } from "@/redux/store";

export default function DayView() {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000); // Cập nhật mỗi phút

    return () => clearInterval(interval);
  }, []);

  const selectedDate = useSelector(
    (state: RootState) => state.selectedDate.selectedDate,
  );

  const hours = get24Hours();
  const today = dayjs();
  const isToday = today.isSame(currentTime, "day");
  const isSelected = selectedDate
    ? dayjs(selectedDate).isSame(today, "day")
    : false;

  return (
    <div className="flex flex-1 flex-col">
      <div className="grid h-[10%] flex-grow grid-cols-[auto_auto_1fr]">
        <div className="col-auto flex w-16 items-center justify-center border-r text-xs">
          GMT+07
        </div>
        <div className="col-auto flex w-16 flex-col items-center">
          <div className="text-sm font-medium text-gray-600">
            {dayjs(selectedDate)
              .format("dddd")
              .replace("thứ hai", "TH 2")
              .replace("thứ ba", "TH 3")
              .replace("thứ tư", "TH 4")
              .replace("thứ năm", "TH 5")
              .replace("thứ sáu", "TH 6")
              .replace("thứ bảy", "TH 7")
              .replace("chủ nhật", "CN")}
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center text-center text-sm font-medium tracking-wide ${
              isSelected
                ? "rounded-full bg-blue-500 font-bold text-white"
                : "text-gray-700"
            }`}
          >
            {dayjs(selectedDate).format("DD")}
          </div>
        </div>
      </div>

      <ScrollArea className="col-span-1 grid h-[90%]">
        <div className="grid grid-cols-[auto_1fr]">
          <div className="col-span-1 flex w-16 flex-col">
            {hours.map((hour, index) => (
              <div
                key={index}
                className="h-16 border-r bg-white text-center text-sm"
              >
                {hour.format("HH:mm")}
              </div>
            ))}
          </div>

          <div className="relative col-span-1 flex flex-col bg-white">
            {(isToday && dayjs(selectedDate).isSame(currentTime, "day")) && (
              <div
                className="absolute right-0 left-0 h-0.5 bg-red-500"
                style={{
                  top: `${((currentTime.hour() * 60 + currentTime.minute()) / (24 * 60)) * 100}%`,
                }}
              />
            )}

            {hours.map((_, idx) => (
              <div
                key={idx}
                
                className="flex h-16 cursor-pointer flex-col border border-gray-300 text-center text-sm hover:bg-gray-200"
              ></div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
