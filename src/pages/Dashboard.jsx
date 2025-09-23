import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/api/authSlice";
import Sidebar from "../components/Sidebar";
import Signup from "./CreateUser";

// RTK Query hooks
import {
  useGetUsersQuery,
  useGetTeacherClassesQuery,
  useGetTeacherExamsQuery,
  useGetStudentSubjectsQuery,
  useGetStudentResultsQuery,
} from "../redux/api/apiSlice";

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  const { data: subjects } = useGetStudentSubjectsQuery(undefined, {
    skip: user?.role !== "student",
  });
  const { data: results } = useGetStudentResultsQuery(undefined, {
    skip: user?.role !== "student",
  });

  const handleModalClose = () => setShowModal(false);
  const handleUserCreated = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            <div className="w-10"></div>
          </div>

          {/* Main Area */}
          <main className="p-4 sm:p-6 lg:p-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Welcome back, {user?.name || "User"}! 👋
                  </h1>
                  <p className="text-gray-600 mt-2">
                    You're logged in as{" "}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {user?.role || "Member"}
                    </span>
                  </p>
                  <p className="text-gray-500 mt-1 text-sm">{user?.email}</p>
                </div>

                {/* Admin only - Create User */}
                {user?.role === "admin" && (
                  <div className="hidden sm:block">
                    <button
                      onClick={() => setShowModal(true)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {user?.role === "admin" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {users ? users.length : "—"}
                  </p>
                </div>
              )}

              {user?.role === "teacher" && (
                <>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-sm font-medium text-gray-600">
                      Your Classes
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {classes ? classes.length : "—"}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-sm font-medium text-gray-600">
                      Your Exams
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {exams ? exams.length : "—"}
                    </p>
                  </div>
                </>
              )}

              {user?.role === "student" && (
                <>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-sm font-medium text-gray-600">
                      Your Subjects
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {subjects ? subjects.length : "—"}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-sm font-medium text-gray-600">
                      Your Results
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {results ? results.length : "—"}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Getting Started Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Getting Started
              </h3>
              <p className="text-gray-600 mb-4">
                Use the sidebar to navigate. Features are shown based on your
                role.
              </p>

              {user?.role === "admin" && (
                <p>✅ You can manage users & reports.</p>
              )}
              {user?.role === "teacher" && (
                <p>📚 You can manage classes & exams.</p>
              )}
              {user?.role === "student" && (
                <p>🎓 You can view subjects & results.</p>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New User
              </h3>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
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
