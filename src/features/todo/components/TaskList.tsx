"use client";

import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/redux/calendar/task.slice";

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: string;
  onTaskSelect: (id: string) => void;
}

export function TaskList({ tasks, selectedTaskId, onTaskSelect }: TaskListProps) {
  return (
    <div className="w-full border-r md:w-1/3 lg:w-1/4">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-700">Today</h1>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600">
            {tasks.length}
          </span>
        </div>
      </div>
    </div>
  );
}