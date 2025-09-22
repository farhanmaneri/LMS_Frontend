import React from "react";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/api/apiSlice";

export default function ChangePassword({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await changePassword(data).unwrap();
      reset(); // Clear the form
      if (onSuccess) {
        onSuccess(); // Close modal and show success message
      } else {
        alert(res.message); // Fallback for standalone page
      }
    } catch (err) {
      alert(err?.data?.message || "Error changing password");
    }
  };

  return (
    <div
      className={
        onSuccess ? "" : "min-h-screen flex items-center justify-center"
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-6 bg-white rounded shadow w-full ${
          onSuccess ? "" : "max-w-md"
        }`}
      >
        {!onSuccess && <h2 className="text-xl mb-4">Change Password</h2>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Old Password
          </label>
          <input
            type="password"
            placeholder="Enter your current password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold p-3 rounded-lg transition-all duration-200 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
