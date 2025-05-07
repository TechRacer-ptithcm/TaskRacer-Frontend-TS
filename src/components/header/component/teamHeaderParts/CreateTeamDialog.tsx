import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { closeCreateTeamDialog } from '@/redux/team/sclice/teamSlice';

const CreateTeamDialog: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.team.isCreateTeamDialogOpen);

  const handleClose = () => {
    dispatch(closeCreateTeamDialog());
  };

  const handleSubmit = () => {
    // Xử lý tạo team ở đây
    console.log('Creating team:', teamName, visibility);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "1.5rem",
        },
      }}
      aria-hidden={!isOpen}
    >
      <DialogContent className="max-w-lg space-y-4 rounded-3xl p-4 shadow-xl">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <IoCloseSharp className="h-5 w-5" />
          </Button>
        </div>

        <Input
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Nhập tên nhóm"
          className="rounded-none border-0 border-b border-blue-400 text-base font-medium shadow-none focus-visible:border-b-2 focus-visible:border-blue-500 focus-visible:ring-0"
        />

        <div className="flex justify-center">
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

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="rounded-full bg-[#ff5470] px-6 py-3 font-['Baloo_2',sans-serif] font-medium text-white shadow-md hover:bg-[#ff3c5c]"
          >
            Tạo nhóm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;