import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfileDTO } from "../domain/dtos/request";
import { getProfile } from "../application";
import { createAuthRepository } from "./repository";

interface AuthState {
  profile: IUserProfileDTO | null;
  token: string | null;
}

const initialState: AuthState = {
  profile: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    saveJWT: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.profile = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      if (action.payload) state.profile = action.payload;
    });
  },
});

const authRepository = createAuthRepository();

export const fetchUserInfo = createAsyncThunk(
  "profile/fechUserData",
  async () => {
    try {
      const response = await getProfile(authRepository)();
      return response;
    } catch {
      console.error("Unable to get profile");
    }
  }
);

export const { reset, saveJWT, logout } = authSlice.actions;

export default authSlice.reducer;
