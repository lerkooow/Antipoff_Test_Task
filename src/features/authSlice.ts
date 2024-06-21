import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<string, { email: string; password: string }, { rejectValue: string }>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    if (email !== "eve.holt@reqres.in" || password !== "cityslicka") {
      return rejectWithValue("Неправильный email или пароль");
    }

    try {
      const response = await axios.post("https://reqres.in/api/login", { email, password });
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const regUser = createAsyncThunk<string, { email: string; password: string }, { rejectValue: string }>(
  "auth/regUser",
  async ({ email, password }, { rejectWithValue }) => {
    if (email !== "eve.holt@reqres.in" || password !== "pistol") {
      return rejectWithValue("При регистрации произошла ошибка");
    }

    try {
      const response = await axios.post("https://reqres.in/api/register", { email, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Произошла неизвестная ошибка";
      })
      .addCase(regUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(regUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", JSON.stringify(action.payload));
      })
      .addCase(regUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Произошла неизвестная ошибка";
      });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
