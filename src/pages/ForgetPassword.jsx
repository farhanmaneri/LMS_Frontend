import React from "react";
import { useForm } from "react-hook-form";
import { useForgetPasswordMutation } from "../redux/api/apiSlice";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await forgetPassword(data).unwrap();
      alert(res.message);
    } catch (err) {
      alert(err?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded shadow w-full max-w-md"
      >
        <h2 className="text-xl mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
