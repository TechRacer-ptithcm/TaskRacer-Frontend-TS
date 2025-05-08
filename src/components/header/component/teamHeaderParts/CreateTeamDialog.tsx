import { useState } from "react";
import { Dialog, /* DialogContent, */ Typography } from "@mui/material"; // Typography added
import { Button } from "@/components/ui/button";
// import { IoCloseSharp } from "react-icons/io5"; // This import will be removed or commented out
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { closeCreateTeamDialog } from '@/redux/team/sclice/teamSlice';
import { createTeam } from '@/redux/team/service/teamApi';
import logoIcon from "@/assets/images/logos/TaskRacerLogo.ico"; // Added

const CreateTeamDialog: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.team.isCreateTeamDialogOpen);
  const userId = useAppSelector((state) => state.user.id);
  const userName = useAppSelector((state) => state.user.name); // Added

  const handleClose = () => {
    dispatch(closeCreateTeamDialog());
  };

  const handleSubmit = async () => {
    try {
      const ownerId = userId;
      const slug = teamName.toLowerCase().replace(/\s+/g, '-');
      await dispatch(createTeam({ 
        slug,
        name: teamName, 
        ownerId,
        visibility 
      }));
      handleClose();
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "1.5rem",
          width: 700,
          height: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px',
        },
      }}
      aria-hidden={!isOpen}
    >
      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center justify-center gap-2">
          <img src={logoIcon} alt="TaskRacer Logo" className="h-12 w-12 rounded" />
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF3B30' }}>TaskRacer</h1>
        </div>
        <Typography style={{ fontSize: '20px', color: 'text.primary' }}>
            Welcome, {userName || 'User'}!
        </Typography>
      </div>

      <div className="p-4">
        <Input
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Nhập tên nhóm"
          className="w-full mt-4"
        />

        <div className="flex justify-center mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-32">
                {visibility === 'PUBLIC' ? 'Công khai' : 'Riêng tư'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[9999] w-40">
              <DropdownMenuItem onSelect={() => setVisibility('PUBLIC')}>
                Công khai
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setVisibility('PRIVATE')}>
                Riêng tư
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSubmit}
            className="bg-[#ff5470] hover:bg-[#ff3c5c] text-white"
          >
            Tạo nhóm
          </Button>
        </div>
    </Dialog>
  );
};

export default CreateTeamDialog;