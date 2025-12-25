import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Name, email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await register(form);

      navigate("/verify-email", {
        state: { email: form.email },
      });
    } catch (err) {
       console.log("REGISTER ERROR:", err.response?.data || err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <form onSubmit={submit}>
    //   <h2>Register</h2>

    //   {error && <p style={{ color: "red" }}>{error}</p>}

    //   <input
    //     placeholder="Name"
    //     value={form.name}
    //     onChange={(e) =>
    //       setForm({ ...form, name: e.target.value })
    //     }
    //     disabled={loading}
    //   />

    //   <input
    //     placeholder="Email"
    //     value={form.email}
    //     onChange={(e) =>
    //       setForm({ ...form, email: e.target.value })
    //     }
    //     disabled={loading}
    //   />

    //   <input
    //     placeholder="Phone"
    //     value={form.phone}
    //     onChange={(e) =>
    //       setForm({ ...form, phone: e.target.value })
    //     }
    //     disabled={loading}
    //   />

    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={form.password}
    //     onChange={(e) =>
    //       setForm({ ...form, password: e.target.value })
    //     }
    //     disabled={loading}
    //   />

    //   <button disabled={loading}>
    //     {loading ? "Registering..." : "Register"}
    //   </button>
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
          Create your account
        </p>

        {/* Card */}
        <form onSubmit={submit}>
        <div className="bg-white rounded-xl shadow-lg p-8 text-left">
          <h2 className="text-xl font-semibold text-slate-800">
            Get started
          </h2>
          <p className="text-slate-500 text-sm mt-1 mb-6">
            Enter your details to create a new account.
          </p>

          {/* Name */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full mb-4 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={form.name}
            onChange={e => setForm({...form,name:e.target.value})}
          />

          {/* Email */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={form.email}
            onChange={e => setForm({...form,email:e.target.value})}
          />

          {/* Phone */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone
          </label>
          <input
            type="Phone"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={form.phone}
            onChange={e => setForm({...form,phone:e.target.value})}
          />

          {/* Password */}
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full mb-4 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={form.password}
            onChange={e => setForm({...form,password:e.target.value})}
          />

          {/* Confirm Password
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Confirm password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full mb-6 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          /> */}

          {/* Button */}
          <button className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
              <Link to={"/login"} >Sign in</Link>
            </span>
          </p>
        </div>
        </form>
      </div>
    </AuthLayout>
 

  );
}
