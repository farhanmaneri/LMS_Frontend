import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/api/apiSlice";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword({
        token,
        newPassword: data.newPassword,
      }).unwrap();
      alert(res.message);
      navigate("/login");
    } catch (err) {
      alert(err?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded shadow w-full max-w-md"
      >
        <h2 className="text-xl mb-4">Reset Password</h2>

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
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
