import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/api/authSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Signup from "./CreateUser";

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold">
            Welcome, {user?.name} ({user?.role})
          </h2>
          <p className="text-gray-600 mt-2">
            Select an option from the sidebar.
          </p>
        </main>
      </div>

      {/* Modal for Create User */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Create New User</h2>
            <Signup onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
