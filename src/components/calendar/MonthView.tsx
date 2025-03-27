import { getMonth } from "@/utils/date";
import MonthBox from "./MonthBox";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function MonthView() {
  const selectedDate = useSelector((state: RootState) => state.selectedDate.selectedDate);
  const [month, setMonth] = useState(getMonth(selectedDate.getMonth()));

  useEffect(() => {
    setMonth(getMonth(selectedDate.getMonth()));
  }, [selectedDate]);

  return (
    <div className="grid h-full flex-grow grid-cols-7 grid-rows-6 cursor-pointer">
      {month.map((week, rowIndex) =>
        week.map((day, colIndex) => (
          <MonthBox
            key={`${rowIndex}-${colIndex}`}
            date={day}
            rowIndex={rowIndex}
          />
        )),
      )}
    </div>
  );
}
