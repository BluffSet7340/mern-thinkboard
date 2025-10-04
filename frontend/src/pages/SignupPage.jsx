import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup, error, isLoading } = useAuthStore(); // grabbing the signup function from the authStore
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      await signup(email, password, name);
      navigate("/verify-email"); // navigate to page once signup is successful

      // const res = await fetch("http://localhost:5001/api/auth/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error("Signup failed");
      // toast.success("Account created successfully!");
      //      toast.error("Signup failed.", error);
    } catch (err) {
      console.log(err);
      // console.log(error)
      toast.error(error)
    }
  };

  // console.log(error)


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 flex-col">
      <form
        className="bg-base-100  rounded-t-lg p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-bold text-primary mb-2">Sign Up</h2>
        <div className="form-control">
          <label
            className="label font-semibold text-base-content"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="input input-bordered input-primary w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
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
        <PasswordStrengthMeter password={password} />
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div
        className="px-8 py-4 bg-yellow-500 bg-opacity-50
      flex justify-center  w-full max-w-md rounded-b-lg"
      >
        <p className="text-sm text-black">
          Already have an account?{" "}
          <Link className="text-yellow-900 hover:underline" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
