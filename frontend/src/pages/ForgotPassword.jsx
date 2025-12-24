import { useState } from "react";
import { forgotPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";


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
    <form onSubmit={submit}>
      <h2>Forgot Password</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button>Send OTP</button>
    </form>
  );
}
