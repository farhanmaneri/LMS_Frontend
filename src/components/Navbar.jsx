// src/components/Navbar.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "../redux/api/authSlice";
import CreateUser from "../pages/CreateUser";
import ChangePassword from "../pages/ChangePassword";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const handleUserCreated = () => {
    setShowCreateModal(false);
    // You can add a success notification here if needed
    alert("User created successfully!");
  };

  const handlePasswordChanged = () => {
    setShowChangePasswordModal(false);
    alert("Password changed successfully!");
  };

  return (
    <>
      <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <NavLink to="/dashboard" className="hover:text-blue-500">
            LMS Dashboard
          </NavLink>
        </h1>
        <div className="flex gap-4 items-center">
          {/* Change Password Button - Available for all users */}
          <button
            onClick={() => setShowChangePasswordModal(true)}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors"
          >
            Change Password
          </button>

          {/* Create User Button - Only for admin */}
          {user?.role === "admin" && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors"
            >
              Create User
            </button>
          )}

          <button
            onClick={() => dispatch(logout())}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Create User Modal - Only for admin */}
      {showCreateModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          onClick={(e) =>
            e.target === e.currentTarget && handleCloseCreateModal()
          }
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New User
              </h3>
              <button
                onClick={handleCloseCreateModal}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <CreateUser onSuccess={handleUserCreated} />
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal - Available for all users */}
      {showChangePasswordModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          onClick={(e) =>
            e.target === e.currentTarget && handleCloseChangePasswordModal()
          }
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Change Password
              </h3>
              <button
                onClick={handleCloseChangePasswordModal}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <ChangePassword onSuccess={handlePasswordChanged} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
