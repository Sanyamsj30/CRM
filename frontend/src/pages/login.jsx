import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message);
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

          {/* Email */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={form.email}
            onChange={e => setForm[{...form,email:e.target.value}]}
          />

          {/* Password */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full mb-6 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={form.password}
            onChange={e => setForm[{...form,password:e.target.value}]}
          />

          <div className="text-right mb-4">
            <span className="text-sm text-emerald-600 cursor-pointer hover:underline">
              <Link to={"/forgot-password"}>Forgot password?</Link>
            </span>
          </div>


          {/* Button */}
          <button className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition">
            Sign in
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
              <Link to={"/"}>Sign up</Link>
            </span>
          </p>
        </div>
      </form>
      </div>
    </AuthLayout>

  );
}
