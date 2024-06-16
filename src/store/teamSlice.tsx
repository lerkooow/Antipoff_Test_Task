import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Member {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface TeamState {
  members: Member[];
  isLoading: boolean;
}

const initialState: TeamState = {
  members: [],
  isLoading: false,
};

export const fetchTeamMembers = createAsyncThunk<Member[]>("team/fetchTeamMembers", async () => {
  const response = await axios.get("https://reqres.in/api/users");
  return response.data.data;
});

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.members = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTeamMembers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default teamSlice.reducer;
