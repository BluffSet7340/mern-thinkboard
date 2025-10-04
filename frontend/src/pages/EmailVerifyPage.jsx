import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerifyPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]); // useref hook to keep track of the inputs
  const navigate = useNavigate();
  const { verifyEmail, error, isLoading } = useAuthStore();

  // Handle input change for each box
  const handleChange = (value, idx) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[idx] = value.slice(0, 1); // Only one digit per box
    setOtp(newOtp);

    // Move to next input if filled
    if (value && idx < 5) {
      inputsRef.current[idx + 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const pasteData = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasteData.length === 6) {
      setOtp(pasteData.split(""));
      inputsRef.current[5].focus();
    }
  };

  const handleKeydownEvent = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sixDigitCode = otp.join("");
      await verifyEmail(sixDigitCode);
      navigate("/"); // navigate to homepage once user is verified
      toast.success("Email verified successfully");

      //   const res = await fetch("/api/auth/verify-email", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ sixDigitCode: code }),
      //   });
      //   const data = await res.json();
      //   if (data.success) {
      //     setMessage("Email verified successfully!");
      //   } else {
      //     setMessage(data.message || "Verification failed.");
      //   }
    } catch (err) {
      console.log(err);
      setOtp(["", "", "", "", "", ""]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        className="bg-base-100 p-8 rounded shadow-lg max-w-md w-full flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Verify Your Email
        </h2>
        <p className="mb-6 text-base-content text-center">
          Enter the 6-digit code sent to your email.
        </p>
        <div className="flex gap-2 mb-6" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`input input-bordered w-12 h-12 text-center text-xl font-bold transition-all
                ${digit ? "border-primary" : "border-base-300"}
                focus:border-primary focus:ring-2 focus:ring-primary`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => handleKeydownEvent(idx, e)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading || otp.some((d) => d === "")}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
        {error && (
          <div className="mt-4 text-center text-base-content text-red-500">{error}</div>
        )}
      </form>
    </div>
  );
};

export default EmailVerifyPage;
