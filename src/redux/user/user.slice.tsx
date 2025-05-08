import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
const API_URL = import.meta.env.VITE_API_URL;

interface UserState {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  birth: string;
  streak: number;
  userInfoSubmitted: boolean;
  active: boolean;
}

const initialState: UserState = {
  id: "",
  username: "",
  password: "",
  email: "",
  name: "",
  gender: "",
  birth: "",
  streak: 0,
  userInfoSubmitted: false,
  active: true,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
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
        return rejectWithValue(
          res.response?.data?.code ?? "Lỗi khi lấy dữ liệu người dùng",
        );
      }
      return rejectWithValue("Lỗi không xác định");
    }
  },
);

export const updateUserInfo = createAsyncThunk(
  "user/updateInfo",
  async (
    data: { name: string; gender: "MALE" | "FEMALE"; birth: string },
    { rejectWithValue, dispatch },
  ) => {
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
        console.error("Update error:", errorData);
        return rejectWithValue(errorData);
      }

      const result = await res.json();
      dispatch(fetchUserData());
      return result;
    } catch (err) {
      console.error("Unexpected error:", err);
      return rejectWithValue({ message: "Lỗi không xác định" });
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUser: () => initialState,
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const {
          id,
          username,
          email,
          name,
          gender,
          birth,
          streak,
          active,
        } = action.payload.data;

        const formattedBirth = birth
          ? birth.split("T")[0].split("-").reverse().join("-")
          : "";

        const formattedGender =
          gender?.toLowerCase() === "male"
            ? "Nam"
            : gender?.toLowerCase() === "female"
              ? "Nữ"
              : "Khác";
        return {
          ...state,
          id,
          username,
          email,
          name,
          gender: formattedGender,
          birth: formattedBirth,
          streak,
          active: active ?? false,
          userInfoSubmitted: name !== "",
        };
      })

      .addCase(fetchUserData.rejected, (state, action) => {
        const errorCode = action.payload;
        console.error("Fetch user data error:", action.payload);
        console.error("Error code:", errorCode);
        if (errorCode == 400001) {
          state.userInfoSubmitted = false;
          state.active = false;
        }
      })
      .addCase(updateUserInfo.fulfilled, (state) => {
        state.userInfoSubmitted = true;
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.userInfoSubmitted = false;
      });
  },
});

export const { setUser, clearUser, setEmail, setUsername, setActive } = userSlice.actions;
export default userSlice.reducer;
