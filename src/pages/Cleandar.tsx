import MonthView from "@/components/calendar/MonthView";
import DayView from "@/components/calendar/DayView";
import WeekView from "@/components/calendar/WeekView";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Cleandar() {
  const selectedViewMode = useSelector((state: RootState) => state.viewMode.selectedViewMode);

  const renderView = () => {
    switch (selectedViewMode) {
      case "day":
        return <DayView />;
      case "week":
        return <WeekView />;
      case "month":
      default:
        return <MonthView />;
    }
  };

  return (
    <div className="flex h-full w-full flex-1 rounded-2xl">
      {renderView()}
    </div>
  );
}
