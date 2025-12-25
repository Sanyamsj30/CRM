import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);


  const submit = async (e) => {
    e.preventDefault();

    // Reset errors
    setError("");
    setFieldErrors({ email: "", password: "" });

    // Frontend validation
    if (!form.email) {
      setFieldErrors({ email: "Email is required", password: "" });
      return;
    }

    if (!form.password) {
      setFieldErrors({ email: "", password: "Password is required" });
      return;
    }

    try {
      setLoading(true);

      await login(form);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed";

      // 🔥 Field-specific handling
      if (message.toLowerCase().includes("password")) {
        setFieldErrors({ email: "", password: "Invalid password" });
      } else if (message.toLowerCase().includes("email")) {
        setFieldErrors({ email: "Invalid email", password: "" });
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // <form onSubmit={submit}>
    //   <h2>Login</h2>
    //   <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
    //   <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
    //   <button>Login</button>
    //   <p style={{ marginTop: "10px" }}>
    //     <Link to="/forgot-password">Forgot password?</Link>
    //   </p>
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
          Your personal CRM
        </p>

        {/* Card */}
        <form onSubmit={submit}>
        <div className="bg-white rounded-xl shadow-lg p-8 text-left">
          <h2 className="text-xl font-semibold text-slate-800">
            Welcome back
          </h2>
          <p className="text-slate-500 text-sm mt-1 mb-6">
            Enter your credentials to access your account
          </p>
          {/* Error message */}
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

          {/* Email */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className={`w-full mb-1 px-4 py-2.5 rounded-lg border ${
                fieldErrors.email
                  ? "border-red-400 focus:ring-red-400"
                  : "border-slate-300 focus:ring-emerald-400"
              } focus:outline-none focus:ring-2`}
            value={form.email}
            onChange={(e) => setForm({...form,email:e.target.value})}
            
          />
          {fieldErrors.email && (
              <p className="text-xs text-red-500 mb-3">
                {fieldErrors.email}
              </p>
          )}

          {/* Password */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className={`w-full mb-1 px-4 py-2.5 rounded-lg border ${
                fieldErrors.password
                  ? "border-red-400 focus:ring-red-400"
                  : "border-slate-300 focus:ring-emerald-400"
              } focus:outline-none focus:ring-2`}
            value={form.password}
            onChange={(e) => setForm({...form,password:e.target.value})}
          />

          {fieldErrors.password && (
              <p className="text-xs text-red-500 mb-4">
                {fieldErrors.password}
              </p>
            )}

          <div className="text-right mb-4">
            <span className="text-sm text-emerald-600 cursor-pointer hover:underline">
              <Link to={"/forgot-password"}>Forgot password?</Link>
            </span>
          </div>


          {/* Button */}
          <button className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
              <Link to={"/register"}>Sign up</Link>
            </span>
          </p>
        </div>
      </form>
      </div>
    </AuthLayout>

  );
}
