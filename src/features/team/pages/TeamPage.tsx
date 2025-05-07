import CreateTeamDialog from "@/components/header/component/teamHeaderParts/CreateTeamDialog";

const TeamPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Team Management</h1>
      <CreateTeamDialog />
    </div>
  );
};

export default TeamPage;