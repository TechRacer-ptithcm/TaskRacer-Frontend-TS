"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task } from "@/redux/calendar/task.slice";

interface TaskDetailsProps {
  task: Task;
  onTitleChange: (title: string) => void;
  onDelete: () => void;
  onSave: () => void;
}

export function TaskDetails({ task, onTitleChange, onDelete, onSave }: TaskDetailsProps) {
  return (
    <div className="flex-1 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-700">Công việc:</h2>
        <Input
          value={task.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Thêm tiêu đề"
          className="rounded-none border-0 border-b border-gray-200 text-base font-medium shadow-none focus-visible:border-b-2 focus-visible:border-gray-300 focus-visible:ring-0"
        />
      </div>
    </div>
  );
}