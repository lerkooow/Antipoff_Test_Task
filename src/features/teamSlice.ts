import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface TeamMember {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface TeamState {
  members: TeamMember[];
  loading: boolean;
  error: string | null;
  page: number;
  total_pages: number;
  liked: { [key: number]: boolean };
}

const initialState: TeamState = {
  members: [],
  loading: false,
  error: null,
  page: 1,
  total_pages: 1,
  liked: {},
};

interface FetchTeamMembersResponse {
  members: TeamMember[];
  total_pages: number;
}
export const fetchTeamMembers = createAsyncThunk<FetchTeamMembersResponse, number, { rejectValue: string }>(
  "team/fetchTeamMembers",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      return {
        members: response.data.data,
        total_pages: response.data.total_pages,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const memberId = action.payload;
      state.liked[memberId] = !state.liked[memberId];
      localStorage.setItem("likedMembers", JSON.stringify(state.liked));
    },
    loadLikes: (state, action: PayloadAction<{ [key: number]: boolean }>) => {
      state.liked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamMembers.fulfilled,
        (state, action: PayloadAction<{ members: TeamMember[]; total_pages: number }>) => {
          state.members = action.payload.members;
          state.total_pages = action.payload.total_pages;
          state.loading = false;
        }
      )
      .addCase(fetchTeamMembers.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Произошла неизвестная ошибка";
      });
  },
});

export const { setPage, toggleLike, loadLikes } = teamSlice.actions;

export default teamSlice.reducer;
