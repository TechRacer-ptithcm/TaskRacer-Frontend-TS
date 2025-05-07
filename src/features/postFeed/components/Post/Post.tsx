import PostHeader from "./PostHeader";
import PostActions from "./PostActions";

export default function Post() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-md bg-white shadow-md">
      <PostHeader />
      {/* Post image */}
      <div className="relative aspect-[4/5] w-full">
        <img
          src="/placeholder.svg"
          alt="Instagram post"
          className="h-full w-full object-cover"
        />
      </div>
      <PostActions />
    </div>
  );
}
