import { useState } from "react";
import { forgotPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";
import { Link } from "react-router-dom";


export default function ForgotPassword() {


  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    console.log("Calling forgot password API");
    await forgotPassword({ email });
    navigate("/reset-password", { state: { email } });
  };

  return (
    // <form onSubmit={submit}>
    //   <h2>Forgot Password</h2>
    //   <input
    //     placeholder="Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <button>Send OTP</button>
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
            Forgot password
          </h2>
          <p className="text-slate-500 text-sm mt-1 mb-6">
            Enter your email and we’ll send you a reset link.
          </p>

          {/* Email */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mb-6 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Button */}
          <button className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition">
            Send OTP
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Remembered your password?{" "}
            <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
              <Link to={"/login"} >Back to sign in</Link>
            </span>
          </p>
        </div>
        </form>
      </div>
    </AuthLayout>
  );
}
