import { useState, useEffect } from "react";
import { resetPassword } from "../api/auth";
import { useLocation, useNavigate } from "react-router-dom";

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
    <form onSubmit={submit}>
      <h2>Reset Password</h2>

      <input
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Reset Password</button>
    </form>
  );
}
