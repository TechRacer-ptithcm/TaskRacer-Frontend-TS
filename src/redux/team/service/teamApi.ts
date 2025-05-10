import axios from "@/lib/axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateTeamRequest } from '../teamTypes/CreateTeamRequest';

const API_URL = import.meta.env.VITE_API_URL;

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async (teamData: CreateTeamRequest) => {
    try {
      const response = await axios.post(`${API_URL}social/team`, teamData);
      console.log(response.data.data);
      return response.data.data;
    } catch (error: any) {
      throw error.response?.data || "Đã có lỗi xảy ra khi tạo team";
    }
  }
);

// export const fetchTeams = createAsyncThunk(
//   'teams/fetchTeams',
//   async () => {
//     try {
//       const response = await axios.get(`${API_URL}social/teams`);
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "Đã có lỗi xảy ra khi lấy danh sách team";
//     }
//   }
// );