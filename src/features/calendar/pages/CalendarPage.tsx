import MonthView from "@/features/calendar/components/MonthView";
import DayView from "@/features/calendar/components/DayView";
import WeekView from "@/features/calendar/components/WeekView";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PopUpCalen from "@/features/calendar/components/popup-calendar";
import EventSummary from "@/features/calendar/components/EventSummary";
import PopupEdit from "@/features/calendar/components/popup-edit";

export default function CalendarPage() {
  const selectedViewMode = useSelector(
    (state: RootState) => state.viewMode.selectedViewMode,
  );

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
    <div className="relative flex h-full w-full flex-1 overflow-hidden rounded-2xl border border-neutral-900 shadow-lg">
      {renderView()}
      <PopUpCalen />
      <EventSummary />
      <PopupEdit />
    </div>
  );
}