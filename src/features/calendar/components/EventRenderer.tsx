import { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Task } from "@/redux/calendar/task.slice";
import { openSummaryPopup } from "@/redux/calendar/popupSummary.slice";
import { useDispatch } from "react-redux";
import { openRemainingEventsDialog } from "@/redux/calendar/remainingEventsDialog.slice";
// Bỏ import RemainingEventsDialog nếu không còn sử dụng ở đâu khác trong file này
// import RemainingEventsDialog from "./RemainingEventsDialog"; 

interface Props {
  date: Dayjs;
}

const EventRenderer: FC<Props> = ({ date }) => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const viewMode = useSelector(
    (state: RootState) => state.viewMode.selectedViewMode,
  );
  const dispatch = useDispatch();

  const handleOpenSummary = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      dispatch(openSummaryPopup(task));
    }
  };

  const filteredEvents: Pick<Task, "id" | "title" | "start" | "priority">[] = tasks.filter(
    (event) => {
      const eventTime = dayjs(event.start);

      if (viewMode === "day" || viewMode === "week") {
        return eventTime.isSame(date, "hour");
      }

      return eventTime.isSame(date, "day");
    },
  );

  const getPriorityColor = (priority: "LOW" | "MEDIUM" | "HIGH") => {
    switch (priority) {
      case "LOW":
        return "bg-blue-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "HIGH":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const maxDirectlyDisplayedEvents = 2;
  const eventsToDisplay = filteredEvents.slice(0, maxDirectlyDisplayedEvents);
  const remainingEvents = filteredEvents.slice(maxDirectlyDisplayedEvents);
  const remainingCount = remainingEvents.length;

  const handleOpenRemainingEventsDialog = () => {
    if (remainingEvents.length > 0) {
      dispatch(openRemainingEventsDialog({ events: remainingEvents, date: date.toISOString() }));
    }
  };

  return (
    // Không cần Fragment <> </> nếu chỉ có một div con chính
    <div className="flex flex-col gap-1 event-task">
      {eventsToDisplay.map((event) => (
        <div
          key={event.id}
          className={`line-clamp-1 w-full cursor-pointer rounded-sm p-1 text-center text-sm text-white ${getPriorityColor(event.priority)}`}
          onClick={() => handleOpenSummary(event.id)}
        >
          {event.title || "(Không có tiêu đề)"}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className="line-clamp-1 w-full cursor-pointer rounded-sm p-1 text-center text-xs text-white bg-gray-500 dark:bg-gray-800"
          onClick={handleOpenRemainingEventsDialog}
        >
          {remainingCount} mục khác
        </div>
      )}
    </div>
  );
};

export default EventRenderer;
