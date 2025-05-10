import axios from "@/lib/axios";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserDataService = async () => {
  try {
    const response = await axios.get(`${API_URL}social/user-data`);
    return response.data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: unknown }).response === "object"
    ) {
      const res = error as { response?: { data?: { code?: string } } };
      throw new Error(res.response?.data?.code ?? "Lỗi khi lấy dữ liệu người dùng");
    }
    throw new Error("Lỗi không xác định");
  }
};

export const updateUserInfoService = async (data: {
  name: string;
  gender: "MALE" | "FEMALE";
  birth: string;
}) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${API_URL}social/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }

    return await res.json();
  } catch (err) {
    throw { message: "Lỗi không xác định" };
  }
};