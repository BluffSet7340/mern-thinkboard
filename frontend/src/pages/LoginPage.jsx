import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetButton, setShowResetButton] = useState(false);
  const {login, isLoading, error} = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowResetButton(false); // Hide reset button on new attempt
    try {
      await login(email, password);
    } catch (err) {
      toast.error(error);
      console.log(err);
      
      // Show reset button if it's a credential/password error
      if (error && (error.includes("Invalid") || error.includes("password") || error.includes("credentials"))) {
        setShowResetButton(true);
      }
    }
  };

  const handleResetPassword = () => {
    navigate("/forgot-password");
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
          disabled={isLoading}
        >
          {isLoading? "Logging in..." : "Login"}
        </button>
        
        {/* Reset Password Button - appears after failed login */}
        {showResetButton && (
          <button
            type="button"
            onClick={handleResetPassword}
            className="btn btn-outline btn-warning w-full mt-2 animate-fade-in"
          >
            Reset Password
          </button>
        )}
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