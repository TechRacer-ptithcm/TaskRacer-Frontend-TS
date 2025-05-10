import React from 'react';
import TaskListHeader from './TaskListHeader';
import TaskItem from './TaskItem';
import AddTaskInlineButton from './AddTaskInlineButton';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface StatusSectionProps {
  statusName: string;
  taskCount: number;
  tasks: Array<{ id: string; name: string }>;
}

const StatusSection: React.FC<StatusSectionProps> = ({ statusName, taskCount, tasks }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <span className="mr-2 text-gray-400 cursor-pointer">▼</span> {/* Placeholder for expand/collapse icon */}
        <h3 className="text-sm font-semibold uppercase">{statusName}</h3>
        <span className="ml-2 text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">{taskCount}</span>
        <Button
          variant="ghost"
          className="ml-auto text-sm text-gray-500 hover:text-gray-700 border-radius-full"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Task
        </Button>
      </div>
      <TaskListHeader />
      {tasks.map(task => (
        <TaskItem key={task.id} name={task.name} />
      ))}
      <AddTaskInlineButton />
    </div>
  );
};

export default StatusSection;