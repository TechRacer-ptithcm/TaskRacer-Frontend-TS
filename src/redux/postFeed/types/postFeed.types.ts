export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface PostFeedState {
  posts: Post[];
  loading: boolean;
  hasMore: boolean;
  page: number;
}