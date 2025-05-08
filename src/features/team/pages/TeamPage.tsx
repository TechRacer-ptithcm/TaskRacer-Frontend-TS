// import CreateTeamDialog from "@/components/header/component/teamHeaderParts/CreateTeamDialog"; // Tạm thời comment hoặc xóa dòng này
import ProjectHeader from '@/features/team/components/ProjectHeader';
import StatusSection from '@/features/team/components/StatusSection';
// import NewStatusButton from '@/features/team/components/NewStatusButton';

const TeamPage = () => {
  // Dữ liệu mẫu cho tasks
  const todoTasks = [
    { id: '1', name: 'Task 1' },
    { id: '2', name: 'Task 2' },
    { id: '3', name: 'Task 3' },
  ];

  return (
    <div className="p-6 bg-white min-h-screen"> {/* Giả sử nền trắng như trong hình */}
      {/* <h1 className="text-2xl font-bold">Team Management</h1> */} {/* Có thể tiêu đề này không cần nữa nếu ProjectHeader đã đủ */}
      {/* <CreateTeamDialog /> */} {/* Tạm thời comment hoặc xóa */}
      
      <ProjectHeader />
      
      <StatusSection 
        statusName="TO DO" 
        taskCount={todoTasks.length} 
        tasks={todoTasks} 
      />
      
      {/* Bạn có thể thêm các StatusSection khác ở đây nếu cần */}
      {/* Ví dụ:
      <StatusSection 
        statusName="IN PROGRESS" 
        taskCount={inProgressTasks.length} 
        tasks={inProgressTasks} 
      /> 
      */}

      {/* <NewStatusButton /> */}
    </div>
  );
};

export default TeamPage;