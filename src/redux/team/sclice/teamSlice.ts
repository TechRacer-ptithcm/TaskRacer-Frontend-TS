import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Team, TeamState } from '../teamTypes/teamTypes';
import { createTeam } from '../service/teamApi';

const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
  isCreateTeamDialogOpen: false
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<Team[]>) {
      state.teams = action.payload;
    },
    addTeam(state, action: PayloadAction<Team>) {
      state.teams.push(action.payload);
    },
    removeTeam(state, action: PayloadAction<string>) {
      state.teams = state.teams.filter(team => team.slug !== action.payload);
    },
    closeCreateTeamDialog(state) {
      state.isCreateTeamDialogOpen = false;
    },
    openCreateTeamDialog(state) {
      state.isCreateTeamDialogOpen = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.loading = false;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create team";
        console.error("Create team error:", action.error);
      });
  }
});

export const { setTeams, addTeam, removeTeam, closeCreateTeamDialog, openCreateTeamDialog } = teamSlice.actions;
export default teamSlice.reducer;