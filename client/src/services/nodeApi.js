import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://127.0.0.1:3001/api/v1";

export const nodeApi = createApi({
  reducerPath: "nodeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),

  tagTypes: [
  ],

  endpoints: ( builder ) => ( {

    //**** Signup query
    signup: builder.mutation( {
      query: ( body ) => ( {
        url: "/users/signup",
        method: "POST",
        body,
      } ),
    } ),


  } ),

})
 

export const {
    useSignupMutation
} = nodeApi;