import React from 'react';
import { Button as MuiButton, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '@/redux/store';
import { openCreateTeamDialog } from '@/redux/team/sclice/teamSlice';

const CreateWorkspaceButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openCreateTeamDialog());
  };

  return (
    <MuiButton
      variant="text"
      startIcon={<AddIcon sx={{ 
        backgroundColor: '#e0e0e0',
        borderRadius: '4px', 
        padding: '2px',
        color: '#5f6368'
      }} />}
      onClick={handleClick}
      sx={{
        justifyContent: 'flex-start',
        textTransform: 'none',
        color: 'text.primary',
        padding: '8px 16px',
        width: '100%',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Typography variant="body2" sx={{ marginLeft: 1 }}> 
        Create Workspace
      </Typography>
    </MuiButton>
  );
};

export default CreateWorkspaceButton;