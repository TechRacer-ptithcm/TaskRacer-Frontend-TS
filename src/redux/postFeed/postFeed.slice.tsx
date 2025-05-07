import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

interface PostFeedState {
  posts: Post[];
  loading: boolean;
  hasMore: boolean;
  page: number;
}

const initialState: PostFeedState = {
  posts: [],
  loading: false,
  hasMore: true,
  page: 1
};

export const fetchPosts = createAsyncThunk(
  "postFeed/fetchPosts",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/posts?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postFeedSlice = createSlice({
  name: "postFeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = [...state.posts, ...action.payload];
        state.loading = false;
        state.hasMore = action.payload.length > 0;
        state.page += 1;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default postFeedSlice.reducer;