import React from "react";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/api/apiSlice";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await changePassword(data).unwrap();
      alert(res.message);
    } catch (err) {
      alert(err?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded shadow w-full max-w-md"
      >
        <h2 className="text-xl mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          className="w-full p-2 mb-2 border rounded"
          {...register("oldPassword", { required: "Old password is required" })}
        />
        {errors.oldPassword && (
          <p className="text-red-500">{errors.oldPassword.message}</p>
        )}

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-4 border rounded"
          {...register("newPassword", {
            required: "New password is required",
            minLength: { value: 6, message: "Min 6 chars" },
          })}
        />
        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
