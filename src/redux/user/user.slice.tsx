import { createSlice, PayloadAction, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
const API_URL = import.meta.env.VITE_API_URL;

interface UserState {
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
  username: "",
  password: "",
  email: "",
  name: "",
  gender: "",
  birth: "",
  streak: 0,
  userInfoSubmitted: false,
  active: false,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/social/user-data`);
      console.log("user-data:", response.data);
      return response.data;
    } catch (error: any) {
      const code = error?.response?.data?.code;
      console.error("fetchUserData error:", code || error);
      return rejectWithValue(code || "Lỗi khi lấy dữ liệu người dùng");
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
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${API_URL}/social/user`, {
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
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserData.fulfilled, (state, action) => {
      const {
        username,
        email,
        name,
        gender,
        birth,
        score: streak,
        active,
      } = action.payload.data;
    
      return {
        ...state,
        username,
        email,
        name,
        gender,
        birth: birth || "",
        streak,
        active: active ?? false,
        userInfoSubmitted: name !== "",
      };
    })    
  .addCase(fetchUserData.rejected, (state, action) => {
    const errorCode = action.payload;
  
    if (errorCode === 400001) {
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
  }
  
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
