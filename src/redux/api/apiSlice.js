import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Import the dynamic config
import { config } from "../../config/enviroment";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // Use the dynamic configuration
    baseUrl: config.apiBaseUrl,
    timeout: 15000, // 15 second timeout
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Always set these headers
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      // Add auth token for authenticated requests
      const token = getState().auth?.token;
      if (token && endpoint !== "forgetPassword") {
        headers.set("authorization", `Bearer ${token}`);
      }

      // Debug: Log what we're sending (only in development)
      if (config.isDevelopment) {
        console.log("🚀 Request details:", {
          endpoint: endpoint,
          baseUrl: config.apiBaseUrl,
          headers: Object.fromEntries(headers.entries()),
        });
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ... other endpoints

    // 📧 Forget Password - explicitly no auth needed
    forgetPassword: builder.mutation({
      query: (data) => {
        console.log("📧 Forget password request:", {
          data: data,
          url: "/auth/forget-password",
          method: "POST",
          timestamp: new Date().toISOString(),
        });
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response, meta, arg) => {
        console.log("✅ Success response:", response);
        return response;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.error("❌ Error response:", response);
        console.error("❌ Response status:", response.status);
        console.error("❌ Response data:", response.data);
        console.error("❌ Request that failed:", arg);
        return response;
      },
    }),

    // ... other endpoints
    signup: builder.mutation({
      query: (data) => ({
        url: "/admin/create-user",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => "/auth/me",
    }),
    getUsers: builder.query({
      query: () => "/admin/users",
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetProfileQuery,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetUsersQuery,
} = apiSlice;
