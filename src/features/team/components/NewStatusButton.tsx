import React from 'react';

const NewStatusButton: React.FC = () => {
  return (
    <button className="flex items-center px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded border border-dashed">
      {/* Placeholder for Plus icon */}
      <span className="mr-2 text-lg">＋</span>
      New status
    </button>
  );
};

export default NewStatusButton;