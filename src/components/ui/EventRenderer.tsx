import { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Task } from "@/redux/calendar/task.slice";

interface Props {
  date: Dayjs;
}

const EventRenderer: FC<Props> = ({ date }) => {
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const filteredEvents: Pick<Task, "id" | "title" | "start">[] = tasks.filter((event) => {
    const isSameDate = dayjs(event.start).format("DD-MM-YY") === date.format("DD-MM-YY");
    return isSameDate;
  });


  return (
    <div className="flex flex-col gap-1">
      {filteredEvents.map((event) => (
        <div
        key={`${event.id}-${event.start}`}
          className="line-clamp-1 w-[100%] cursor-pointer rounded-sm bg-green-700 p-1 text-sm text-white text-center"
        >
          {event.title}
        </div>
      ))}
    </div>
  );
};

export default EventRenderer;
