import React from 'react';

const TaskListHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-[minmax(200px,_3fr)_1fr_1fr_1fr_auto] gap-x-4 px-3 py-2 border-b text-xs text-gray-500 font-medium">
      <div>Name</div>
      <div>Assignee</div>
      <div>Due date</div>
      <div>Priority</div>
    </div>
  );
};

export default TaskListHeader;