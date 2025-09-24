import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // existing endpoints...
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
      query: () => "/admin/users", // backend route for fetching all users
    }),
    getTeacherClasses: builder.query({
      query: () => "/teacher/classes",
    }),
    getTeacherExams: builder.query({
      query: () => "/teacher/exams",
    }),

    getStudentResults: builder.query({
      query: () => "/student/results", // backend finds student by token
      providesTags: ["Result"],
    }),
    addResult: builder.mutation({
      query: (data) => ({
        url: "/results", // admin/teacher adds result
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Result"],
    }),

    // 👑 Admin APIs
    getUsers: builder.query({
      query: () => "/admin/users",
    }),
    getReports: builder.query({
      query: () => "/admin/reports",
    }),

    // 🔑 Change Password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // 📧 Forget Password
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    // 🔄 Reset Password
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
  useGetTeacherClassesQuery,
  useGetTeacherExamsQuery,
  useAddResultMutation,
  useGetStudentSubjectsQuery,
  useGetStudentResultsQuery,
  useGetReportsQuery,
} = apiSlice;
