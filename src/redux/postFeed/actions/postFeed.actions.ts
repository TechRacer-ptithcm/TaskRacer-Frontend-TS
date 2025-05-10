import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostsService } from "../services/postFeed.service";

export const fetchPosts = createAsyncThunk(
  "postFeed/fetchPosts",
  async (page: number, { rejectWithValue }) => {
    try {
      return await fetchPostsService(page);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);