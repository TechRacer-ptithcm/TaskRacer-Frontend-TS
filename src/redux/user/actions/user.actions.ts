import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserDataService,
  updateUserInfoService,
} from "../services/user.service";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUserDataService();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateInfo",
  async (
    data: { name: string; gender: "MALE" | "FEMALE"; birth: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const result = await updateUserInfoService(data);
      dispatch(fetchUserData());
      return result;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);