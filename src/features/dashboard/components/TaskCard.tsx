import { Avatar, IconButton } from "@mui/material";
import { Add, MoreHoriz } from "@mui/icons-material";
import { tasks, TaskCardProps } from "@/redux/dashboard/TaskData";

export function TaskCard({
  date,
  title,
  description,
  members,
  daysLeft,
}: TaskCardProps) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-[4px_8px_10px_0px_rgba(149,_157,_165,_0.2)]">
      <div className="mb-2 flex items-center justify-between font-['Baloo_2',sans-serif] text-gray-400">
        <span>{date}</span>
        <IconButton size="small">
          <MoreHoriz fontSize="small" />
        </IconButton>
      </div>
      <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold text-[#4B4D6E]">
        {title}
      </h3>
      <p className="font-['Baloo_2',sans-serif] text-gray-500">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2">
          {members.map((name, idx) => (
            <Avatar
              key={idx}
              sx={{ width: 32, height: 32, border: "2px solid white" }}
            >
              {name}
            </Avatar>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="rounded-full bg-pink-100 p-1">
            <Add className="text-pink-600" fontSize="small" />
          </button>
          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-600">
            {daysLeft}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TaskCardList() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
      {tasks.map((task, idx) => (
        <TaskCard key={idx} {...task} />
      ))}
    </div>
  );
}
