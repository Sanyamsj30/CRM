import { useState,useEffect } from "react";
import { verifyEmail } from "../api/auth";
import { useLocation,useNavigate } from "react-router-dom";

export default function VerifyEmail() {
    const [otp,setOtp] = useState("");
    const [loading,setLoading] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    if (!state?.email) {
      navigate("/register");
    }
  }, [state, navigate]);

    const submit = async (e) => {
        e.preventDefault();

        if(otp.length!==6){
            alert("OTP must be 6 digits");
            return;
        }

        try {
            setLoading(true);
            await verifyEmail({
                email:state.email,
                otp,
            })

            navigate("/login");
        } catch (error) {
            alert(err.response?.data?.message || "Verification failed");
        }finally {
            setLoading(false);
        }

    }


    return (
        <form onSubmit={submit}>
            <h2>Verify Email</h2>

            <input 
            placeholder="Enter otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
            />

            <button disabled={loading}>
                {loading?"Verifying...":"Verify"}

            </button>
        </form>
    );
}