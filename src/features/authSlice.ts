import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    if (email !== "eve.holt@reqres.in" || password !== "cityslicka") {
      return rejectWithValue("Неправильный email или пароль");
    }

    try {
      const response = await axios.post("https://reqres.in/api/login", { email, password });
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const regUser = createAsyncThunk(
  "auth/regUser",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    if (email !== "eve.holt@reqres.in" || password !== "pistol") {
      return rejectWithValue("Ошибка регистрации");
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(regUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(regUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
