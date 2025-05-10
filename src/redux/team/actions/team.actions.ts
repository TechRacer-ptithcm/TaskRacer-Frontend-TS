import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateTeamRequest } from '../teamTypes/CreateTeamRequest';
import { createTeamService, fetchTeamsService } from '../service/team.service';

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async (teamData: CreateTeamRequest, { rejectWithValue }) => {
    try {
      return await createTeamService(teamData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTeamsService();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);