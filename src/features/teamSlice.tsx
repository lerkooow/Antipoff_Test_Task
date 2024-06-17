import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../features/utils/constants";

interface TeamMember {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Users {
  data: TeamMember[];
}

export interface UsersId {
  data: TeamMember;
}

export const teamSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchTeamMembers: builder.query<Users, void>({
      query: () => ({
        url: "/users",
      }),
    }),
    fetchMember: builder.query<UsersId, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
    }),
  }),
});

export const { useFetchTeamMembersQuery, useFetchMemberQuery } = teamSlice;
export default teamSlice.reducer;
