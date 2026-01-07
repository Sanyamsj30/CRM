import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-semibold">
              C
            </div>
            <span className="font-semibold text-lg">ContactFlow</span>
          </div>

          <nav className="flex gap-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/customers"
              className="px-3 py-1.5 rounded-md text-sm text-slate-600 hover:bg-slate-100"
            >
              Customers
            </NavLink>
          </nav>
        </div>

        {/* Right */}
        {token ? (
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition"
          >
            ⎋ Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-emerald-600 hover:underline"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
