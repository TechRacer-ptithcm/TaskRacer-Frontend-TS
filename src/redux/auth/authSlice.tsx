import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
const API_URL = import.meta.env.VITE_API_URL;

interface AuthState {
  step:
    | "signIn"
    | "signUp"
    | "forgotPassword"
    | "verifyAccount"
    | "verifyResetPassword"
    | "resetPassword"
    | "userInfo";
  user: {
    email: string;
    username: string;
    password: string;
    loading: boolean;
    error: string | null;
    resetToken: string | null;
    accessToken: string | null;
    active: boolean;
  };
}

const initialState: AuthState = {
  step: "signIn",
  user: {
    email: "",
    username: "",
    password: "",
    loading: false,
    error: null,
    resetToken: null,
    accessToken: null,
    active: false,
  },
};

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}auth/logout`, null, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Logout success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
      return rejectWithValue(
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Đăng xuất thất bại, vui lòng thử lại!",
      );
    }
  },
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    { token, newPassword }: { token: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}auth/change-password`,
        { token, "new-password": newPassword },
        { headers: { "Content-Type": "application/json" } },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Lỗi thay đổi mật khẩu, vui lòng thử lại!",
      );
    }
  },
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<{
        message: string;
        code: string;
        status: boolean;
        data: { accessToken: string };
      }>(`${API_URL}auth/refresh`
, {}, { withCredentials: true });
      return response.data.data.access_token;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Lỗi làm mới phiên đăng nhập, vui lòng thử lại!",
      );
    }
  },
);

export const verifyOtpForgotPassword = createAsyncThunk(
  "auth/verifyOtpForgotPassword",
  async (otpCode: string, { rejectWithValue }) => {
    try {
      const response = await axios.post<{
        message: string;
        code: string;
        status: boolean;
        data: { token: string };
      }>(`${API_URL}auth/verify-otp-forgot-password`, { otp: otpCode });

      return response.data.data.token;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Lỗi xác minh OTP, vui lòng thử lại!",
      );
    }
  },
);

export const resendEmailVerification = createAsyncThunk(
  "auth/resendEmailVerification",
  async (account: string, { rejectWithValue }) => {
    console.log(account);
    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL}auth/resend-email`,
        { account },
        { headers: { "Content-Type": "application/json" } },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Lỗi gửi lại email, vui lòng thử lại!",
      );
    }
  },
);

export const sendOtpForgotPassword = createAsyncThunk(
  "auth/sendOtpForgotPassword",
  async (account: string, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL}auth/send-otp-forgot-password`,
        { account },
        { headers: { "Content-Type": "application/json" } },
      );
      return response.data;
    } catch (error) {
      const apiError = (
        error as AxiosError<{
          data?: { error_message?: string };
          message?: string;
        }>
      )?.response?.data;
      let errorMessage = apiError?.message || "Lỗi gửi OTP, vui lòng thử lại!";

      if (apiError?.data?.error_message === "Email or username not found.") {
        errorMessage = "Tài khoản hoặc email không tồn tại";
      }

      return rejectWithValue(errorMessage);
    }
  },
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const requestData = {
        account: userData.email,
        password: userData.password,
      };  

      const response = await axios.post<{ token: string }>(
        `${API_URL}auth/sign-in`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      )

      return response.data;
    } catch (error) {
      let errorMessage = "Đăng nhập thất bại";

      const apiError = (
        error as AxiosError<{
          data?: { error_message?: string };
          message?: string;
        }>
      )?.response?.data;
      console.log(apiError?.data?.error_message);

      switch (apiError?.data?.error_message) {
        case "User not found.":
          errorMessage = "Tài khoản hoặc mật khẩu không đúng";
          break;
        default:
          errorMessage = apiError?.message || "Đăng nhập thất bại";
      }

      console.log(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    userData: { email: string; username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post<{ success: boolean }>(
        `${API_URL}auth/sign-up`,
        userData,
        { headers: { "Content-Type": "application/json" } },
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ data: { error_message: string } }>)?.response
          ?.data?.data?.error_message || "Đã xảy ra lỗi";

      if (errorMessage === "Username or email already exists.") {
        return rejectWithValue("Tên đăng nhập hoặc email đã tồn tại");
      }

      return rejectWithValue(errorMessage);
    }
  },
);

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (otpCode: string, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ success: boolean }>(
        `${API_URL}auth/verify-account`,
        { otp: otpCode },
      );
      return response.data;
    } catch (error) {
      console.error("verifyAccount error:", error);
      return rejectWithValue(
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Lỗi xác minh tài khoản",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<AuthState["step"]>) => {
      state.step = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    setUserUsername: (state, action: PayloadAction<string>) => {
      state.user.username = action.payload;
    },
    setUserPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.user.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.user.error = action.payload;
    },
    setResetToken: (state, action: PayloadAction<string | null>) => {
      state.user.resetToken = action.payload;
    },
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user = { ...state.user, ...action.payload };
        state.step = "verifyAccount";
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload as string;
      })
      .addCase(signInUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.accessToken = action.payload?.data?.access_token;
        state.user.active = action.payload?.data?.active ?? false;

        if (state.user.accessToken) {
          localStorage.setItem("accessToken", state.user.accessToken);
        }

        if (!state.user.active) {
          state.step = "verifyAccount";
          resendEmailVerification(state.user.email);
        }
      })
      .addCase(signInUser.rejected, (state, action) => {
        console.error("signInUser error:", action.payload);
        state.user.loading = false;
        state.user.error = action.payload as string;
      })
      .addCase(sendOtpForgotPassword.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(sendOtpForgotPassword.fulfilled, (state) => {
        state.user.loading = false;
        state.step = "verifyResetPassword";
      })
      .addCase(sendOtpForgotPassword.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload as string;
      })
      .addCase(verifyOtpForgotPassword.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(verifyOtpForgotPassword.fulfilled, (state, action) => {
        console.log("Received Token:", action.payload);
        state.user.loading = false;
        state.user.resetToken = action.payload;
        console.log(state.user.resetToken);
        state.step = "resetPassword";
      })
      .addCase(verifyOtpForgotPassword.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload as string;
      })
      .addCase(verifyAccount.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.user.loading = false;
        state.step = "signIn";
        localStorage.setItem("accessToken", action.payload.data.access_token);
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload as string;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user.accessToken = action.payload;
        if (action.payload) {
          localStorage.setItem("accessToken", action.payload);
        }
      });
  },
});

export const {
  setStep,
  setUserEmail,
  setUserUsername,
  setUserPassword,
  setUserLoading,
  setUserError,
  setResetToken,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
