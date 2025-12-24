import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Dashboard() {
  if (!isLoggedIn()) return <Navigate to="/login" />;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>You are logged in.</p>
    </div>
  );
}
