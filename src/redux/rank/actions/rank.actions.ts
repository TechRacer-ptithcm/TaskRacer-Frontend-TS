import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentRankingData, getCurrentTopRankingData, getLeaderboardData } from "../services/rank.service";

export const fetchCurrentRankingData = createAsyncThunk(
  "rank/fetchCurrentRankingData",
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentRankingData();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentTopRankingData = createAsyncThunk(
  "rank/fetchCurrentTopRankingData",
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentTopRankingData();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLeaderboardData = createAsyncThunk(
  "rank/fetchLeaderboardData",
  async (_, { rejectWithValue }) => {
    try {
      return await getLeaderboardData();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);