import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-lg font-medium text-slate-800">
          PersonalCRM
        </span>

        <div className="flex items-center gap-6">
          <button className="text-slate-600 hover:text-slate-900">
            <Link to={"/login"}>Log in</Link>
          </button>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600">
            <Link to={"/register"}>Get Started</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}
