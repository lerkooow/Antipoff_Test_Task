import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./utils/constants";

export interface TeamMember {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersId {
  data: TeamMember;
}

export const memberSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchMember: builder.query<UsersId, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
    }),
  }),
});

export const { useFetchMemberQuery } = memberSlice;
export default memberSlice.reducer;
