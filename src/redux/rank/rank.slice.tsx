import { createSlice } from "@reduxjs/toolkit";
import { Leaderboard, CurrentRank } from "./types/leaderboard";
import { leaderboardData } from "./rankData";
import { fetchLeaderboardData, fetchCurrentRankingData } from "./actions/rank.actions";

interface RankState {
  leaderboard: Leaderboard[];
  currentRank: CurrentRank | null;
  loading: boolean;
  error: string | null;
}

const initialState: RankState = {
  leaderboard: leaderboardData,
  currentRank: null,
  loading: false,
  error: null,
};

const rankSlice = createSlice({
  name: "rank",
  initialState,
  reducers: {
    setLeaderboard(state, action) {
      state.leaderboard = action.payload;
    },
    setCurrentRank(state, action) {
      state.currentRank = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboardData.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
        state.loading = false;
      })
      .addCase(fetchLeaderboardData.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch leaderboard data";
        state.loading = false;
      })
      .addCase(fetchCurrentRankingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentRankingData.fulfilled, (state, action) => {
        state.currentRank = {
          user: {
            streak: action.payload.user.streak,
            username: action.payload.user.username,
            name: action.payload.user.name
          },
          score: action.payload.score,
          rankData: {
            rank: action.payload.rankData.rank,
            tier: action.payload.rankData.tier,
            star: action.payload.rankData.star
          }
        };
        state.loading = false;
      })
      .addCase(fetchCurrentRankingData.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch current rank data";
        state.loading = false;
      });
  },
});

export const { setLeaderboard, setCurrentRank, setLoading, setError } = rankSlice.actions;
export default rankSlice.reducer;