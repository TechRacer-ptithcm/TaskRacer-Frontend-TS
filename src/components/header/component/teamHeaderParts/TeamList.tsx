import React from 'react';
import { Button as MuiButton, Typography, Avatar } from '@mui/material';
import { useAppSelector } from '@/redux/store';
import { getLastInitial } from "@/utils/name";

const TeamList: React.FC = () => {
  const teams = useAppSelector((state) => state.team.teams);

  return (
    <>
      {teams.map((team) => (
        <MuiButton
          key={team.slug}
          variant="text"
          startIcon={
            <Avatar sx={{ 
              bgcolor: '#f582ae', 
              width: 32, 
              height: 32,
              fontSize: '0.875rem'
            }}>
              {getLastInitial(team.name)}
            </Avatar>
          }
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
            {team.name}
          </Typography>
        </MuiButton>
      ))}
    </>
  );
};

export default TeamList;