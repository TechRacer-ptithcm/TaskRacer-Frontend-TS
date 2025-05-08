import Post from "@/features/postFeed/components/Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { fetchPosts } from "@/redux/postFeed/postFeed.slice";
import { useEffect } from "react";

export default function PostFeed() {
  const dispatch = useAppDispatch();
  const { posts, loading, hasMore, page } = useAppSelector(state => state.postFeed);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  const fetchMoreData = () => {
    if (hasMore && !loading) {
      dispatch(fetchPosts(page));
    }
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<div className="loader">Coming soon...</div>}
    >
      {posts.map((post) => (
        <Post key={post.id} />
      ))}
    </InfiniteScroll>
  );
}
