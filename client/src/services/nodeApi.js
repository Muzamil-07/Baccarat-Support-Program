import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://127.0.0.1:8000";

export const nodeApi = createApi({
  reducerPath: "nodeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),

  tagTypes: [
  ],

  endpoints: (builder) => ({  
  }),
});

export const {
} = nodeApi;