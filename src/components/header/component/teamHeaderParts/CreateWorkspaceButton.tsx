import React from 'react';
import { Button as MuiButton, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface CreateWorkspaceButtonProps {
  onClick?: () => void;
}

const CreateWorkspaceButton: React.FC<CreateWorkspaceButtonProps> = ({ onClick }) => {
  return (
    <MuiButton
      variant="text"
      startIcon={<AddIcon sx={{ 
        backgroundColor: '#e0e0e0',
        borderRadius: '4px', 
        padding: '2px',
        color: '#5f6368'
      }} />}
      onClick={onClick}
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