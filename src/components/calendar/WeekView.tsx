import { getWeekDays } from "@/utils/date";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ScrollArea } from "../ui/scroll-area";
import { get24Hours } from "@/utils/date";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

export default function WeekView() {
  const selectedDate = useSelector(
    (state: RootState) => state.selectedDate.selectedDate,
  );
  const weekDays = getWeekDays(selectedDate);

  const [currentTime, setCurrentTime] = useState(dayjs());
  const hours = get24Hours();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000); // Cập nhật mỗi phút

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex-1">
      <div className="grid h-[10%] flex-grow grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2">
        <div className="col-auto flex w-16 items-center justify-center border-r text-center text-xs">
          GMT+07
        </div>
        {weekDays.map(({ date, isToday, isSelected }, index) => (
          <div
            key={index}
            className="col-span-1 flex flex-col border-r border-gray-300 bg-white p-2 text-center text-sm"
          >
            {date
              .format("dddd")
              .replace("thứ hai", "TH 2")
              .replace("thứ ba", "TH 3")
              .replace("thứ tư", "TH 4")
              .replace("thứ năm", "TH 5")
              .replace("thứ sáu", "TH 6")
              .replace("thứ bảy", "TH 7")
              .replace("chủ nhật", "CN")}

            <div className="flex h-10 w-full items-center justify-center">
              <div
                className={`flex h-10 w-10 items-center justify-center text-center text-sm font-medium tracking-wide ${
                  isToday
                    ? "rounded-full bg-blue-500 font-bold text-white"
                    : "text-gray-700"
                } ${isSelected ? "border-2" : ""}`}
              >
                {date.format("DD")}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ScrollArea className="h-[90%]">
        <div className="grid flex-grow grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-1 flex w-16 flex-col">
            {hours.map((hour, index) => (
              <div
                key={index}
                className="border-r bg-white text-center text-sm h-16"
              >
                {hour.format("HH:mm")}
              </div>
            ))}
          </div>

          {weekDays.map(({isToday}, index) => (
            <div
              key={index}
              className="relative col-span-1 flex flex-col bg-white"
            >
              {isToday && (
              <div
              className="absolute left-0 right-0 h-0.5 bg-red-500"
              style={{
                top: `${((currentTime.hour() * 60 + currentTime.minute()) / (24 * 60)) * 100}%`,
              }}        
            />            
            )}

              {get24Hours().map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col border border-gray-300 text-center text-sm cursor-pointer h-16 hover:bg-gray-200"
                >
                  
                </div>
              ))}
            </div>

          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
