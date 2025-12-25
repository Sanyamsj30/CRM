import { useState, useEffect } from "react";
import { resetPassword } from "../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.email) {
      navigate("/forgot-password");
    }
  }, [state, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    await resetPassword({
      email: state.email,
      otp,
      newPassword: password,
    });

    navigate("/login");
  };

  return (
    // <form onSubmit={submit}>
    //   <h2>Reset Password</h2>

    //   <input
    //     placeholder="OTP"
    //     value={otp}
    //     onChange={(e) => setOtp(e.target.value)}
    //   />

    //   <input
    //     type="password"
    //     placeholder="New Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />

    //   <button>Reset Password</button>
    // </form>

    <AuthLayout>
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-xl font-semibold">
            C
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-2xl font-semibold text-slate-800">
          ContactFlow
        </h1>
        <p className="text-slate-500 mt-1 mb-8">
          Reset your password
        </p>

        {/* Card */}
        <form onSubmit={submit}>
        <div className="bg-white rounded-xl shadow-lg p-8 text-left">
          <h2 className="text-xl font-semibold text-slate-800">
            Reset password
          </h2>
          <p className="text-slate-500 text-sm mt-1 mb-6">
            Enter OTP and new password.
          </p>

          {/* Email */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            OTP
          </label>
          <input
            type="otp"
            placeholder="OTP"
            className="w-full mb-6 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <label className="block text-sm font-medium text-slate-700 mb-1">
            New password
          </label>
          <input
            type="password"
            placeholder="new password"
            className="w-full mb-6 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Confirm password
          </label>
          <input
            type="password"
            placeholder="confirm password"
            className="w-full mb-6 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Button */}
          <button className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition">
            Reset password
          </button>
        </div>
        </form>
      </div>
    </AuthLayout>
  );
}
