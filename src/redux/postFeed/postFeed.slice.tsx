import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostFeedState } from "./types/postFeed.types";
import { fetchPosts } from "./actions/postFeed.actions";

const initialState: PostFeedState = {
  posts: [],
  loading: false,
  hasMore: true,
  page: 1
};

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