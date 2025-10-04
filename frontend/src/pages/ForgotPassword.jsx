import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // Replace with your API endpoint
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Password reset link sent! Check your email.");
      } else {
        setMessage(data.message || "Error sending reset link.");
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        className="bg-base-100 p-8 rounded shadow-lg max-w-md w-full"
        onSubmit={handleForgotPassword}
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">Forgot Password</h2>
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="input input-bordered w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && (
          <div className="mt-4 text-center text-base-content">{message}</div>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;