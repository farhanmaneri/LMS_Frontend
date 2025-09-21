import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../Redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/api/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // data = { email, password }
      const res = await login(data).unwrap();
      dispatch(setCredentials(res)); // store { user, token }
      navigate("/dashboard"); // go inside app after login
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white rounded shadow"
      >
        <h2 className="text-xl mb-4">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
