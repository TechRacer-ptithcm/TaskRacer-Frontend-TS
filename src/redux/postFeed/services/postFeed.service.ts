import axios from "@/lib/axios";

export const fetchPostsService = async (page: number) => {
  try {
    const response = await axios.get(`/api/posts?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};