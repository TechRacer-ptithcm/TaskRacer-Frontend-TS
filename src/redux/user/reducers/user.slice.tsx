import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/user.types";
import { fetchUserData, updateUserInfo } from "../actions/user.actions";

const initialState: UserState = {
  id: "",
  username: "",
  password: "",
  email: "",
  name: "",
  gender: "",
  birth: "",
  streak: 0,
  userInfoSubmitted: true,
  active: true,
};

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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const { id, username, email, name, gender, birth, streak, active } =
          action.payload.data;

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

export const { setUser, clearUser, setEmail, setUsername, setActive } =
  userSlice.actions;
export default userSlice.reducer;
