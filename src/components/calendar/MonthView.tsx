import { getMonth } from "@/utils/date";
import MonthBox from "./MonthBox";

export default function MonthView() {
  const month = getMonth();

  return (
    <div className="grid h-full flex-grow grid-cols-7 grid-rows-6">
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
