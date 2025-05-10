import React from 'react';

const AddTaskInlineButton: React.FC = () => {
  return (
    <button className="flex items-center px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 w-full">
      {/* Placeholder for Plus icon */}
      <span className="mr-2 text-lg">＋</span>
      Add Task
    </button>
  );
};

export default AddTaskInlineButton;