import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {login, isLoading, error} = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password)
      // // Replace with your API endpoint
      // const res = await fetch("http://localhost:5001/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error("Login failed");
      // toast.success("Logged in successfully!");
      // TODO: Save token and redirect
    } catch (err) {

      toast.error(error);
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 flex-col">
      <form
        className="bg-base-100  rounded-t-lg p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-primary mb-2">Login</h2>
        <div className="form-control">
          <label
            className="label font-semibold text-base-content"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input input-bordered input-primary w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-control">
          <label
            className="label font-semibold text-base-content"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input input-bordered input-primary w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
            <div className="px-8 py-4 bg-yellow-500 bg-opacity-50
      flex justify-center  w-full max-w-md rounded-b-lg">
        <p className="text-sm text-black">
          Need to create an account?{" "}
          <Link className="text-yellow-900 hover:underline" to={"/signup"}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
