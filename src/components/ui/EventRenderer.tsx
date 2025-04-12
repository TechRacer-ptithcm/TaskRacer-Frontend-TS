import { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Task } from "@/redux/calendar/task.slice";
import { openSummaryPopup } from "@/redux/calendar/popupSummary.slice";
import { useDispatch } from "react-redux";

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

  const filteredEvents: Pick<Task, "id" | "title" | "start">[] = tasks.filter(
    (event) => {
      const eventTime = dayjs(event.start);

      if (viewMode === "day" || viewMode === "week") {
        return eventTime.isSame(date, "hour");
      }

      return eventTime.isSame(date, "day");
    },
  );

  return (
    <div className="flex flex-col gap-1 event-task">
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className="line-clamp-1 w-full cursor-pointer rounded-sm bg-green-700 p-1 text-center text-sm text-white"
          onClick={() => handleOpenSummary(event.id)}
        >
          {event.title}
        </div>
      ))}
    </div>
  );
};

export default EventRenderer;
