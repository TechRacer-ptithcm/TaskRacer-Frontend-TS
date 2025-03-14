import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  step: "signIn" | "signUp" | "forgotPassword";
  email: string;
  username: string;
  password: string;
}

const initialState: AuthState = {
  step: "signIn",
  email: "",
  username: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<AuthState["step"]>) => {
      state.step = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetAuthState: () => initialState,
  },
});

export const { setStep, setEmail, setUsername, setPassword, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
