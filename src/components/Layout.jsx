// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/api/authSlice";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main content area with sidebar */}
      <div className="flex pt-16">
        {/* Sidebar - only show if user is logged in */}
        {user && <Sidebar />}

        {/* Main content */}
        <main className={`flex-1 ${user ? "lg:ml-0" : ""}`}>
          <div
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
              user ? "lg:ml-64" : ""
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
