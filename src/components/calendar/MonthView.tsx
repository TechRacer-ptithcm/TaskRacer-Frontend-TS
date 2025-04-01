import { getMonth } from "@/utils/date";
import MonthBox from "./MonthBox";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function MonthView() {
  const selectedDate = useSelector(
    (state: RootState) => state.selectedDate.selectedDate,
  );
  const [month, setMonth] = useState(
    getMonth(new Date(selectedDate).getMonth()),
  );

  useEffect(() => {
    setMonth(getMonth(new Date(selectedDate).getMonth()));
  }, [selectedDate]);

  return (
    <div className="grid h-full flex-grow cursor-pointer grid-cols-7 grid-rows-6">
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
