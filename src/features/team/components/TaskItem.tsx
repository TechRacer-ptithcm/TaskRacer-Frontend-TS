import React from 'react';

interface TaskItemProps {
  name: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ name }) => {
  return (
    <div className="grid grid-cols-[minmax(200px,_3fr)_1fr_1fr_1fr_auto] gap-x-4 px-3 py-3 border-b items-center hover:bg-gray-50">
      <div className="flex items-center">
        <input type="checkbox" className="mr-3 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        <span>{name}</span>
      </div>
      <div className="flex justify-start text-gray-400">
        {/* Placeholder for Assignee icon */}
        <span>👤</span>
      </div>
      <div className="flex justify-start text-gray-400">
        {/* Placeholder for Due date icon */}
        <span>📅</span>
      </div>
      <div className="flex justify-start text-gray-400">
        {/* Placeholder for Priority icon */}
        <span>🚩</span>
      </div>
      <div className="flex justify-center text-gray-400 cursor-pointer">
        {/* Placeholder for More options icon */}
        <span>•••</span>
      </div>
    </div>
  );
};

export default TaskItem;