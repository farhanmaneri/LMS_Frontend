import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/api/authSlice";
import Signup from "./CreateUser";

// RTK Query hooks
import {
  useGetUsersQuery,
  useGetTeacherClassesQuery,
  useGetTeacherExamsQuery,
  useGetMyResultQuery,
  useGetStudentsResultsQuery,
} from "../redux/api/apiSlice";

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const [showModal, setShowModal] = useState(false);

  // Role-based API calls
  const { data: users } = useGetUsersQuery(undefined, {
    skip: user?.role !== "admin",
  });
  const { data: classes } = useGetTeacherClassesQuery(undefined, {
    skip: user?.role !== "teacher",
  });
  const { data: exams } = useGetTeacherExamsQuery(undefined, {
    skip: user?.role !== "teacher",
  });
  const { data: results } = useGetStudentsResultsQuery(undefined, {
    skip: user?.role !== "student",
  });

  const handleModalClose = () => setShowModal(false);
  const handleUserCreated = () => setShowModal(false);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || "User"}! 👋
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                You're logged in as{" "}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                  {user?.role || "Member"}
                </span>
              </p>
              <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                {user?.email}
              </p>
            </div>

            {user?.role === "admin" && (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Create User
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Example Admin card */}
          {user?.role === "admin" && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-700">
                    Total Users
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-900">
                    {users ? users.length : "—"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Getting Started */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Getting Started
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Use the sidebar navigation to explore all available features based
              on your role.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Quick Actions
            </h3>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Create New User
              </h3>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 text-lg sm:text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <Signup onSuccess={handleUserCreated} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
