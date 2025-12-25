import { useState,useEffect } from "react";
import { verifyEmail } from "../api/auth";
import { useLocation,useNavigate } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";

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
        // <form onSubmit={submit}>
        //     <h2>Verify Email</h2>

        //     <input 
        //     placeholder="Enter otp"
        //     value={otp}
        //     onChange={(e) => setOtp(e.target.value)}
        //     disabled={loading}
        //     />

        //     <button disabled={loading}>
        //         {loading?"Verifying...":"Verify"}

        //     </button>
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
                  Verify your email
                </p>
        
                {/* Card */}
                <form onSubmit={submit}>
                <div className="bg-white rounded-xl shadow-lg p-8 text-left">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Verify password
                  </h2>
                  <p className="text-slate-500 text-sm mt-1 mb-6">
                    Enter OTP.
                  </p>
        
                  {/* Email */}
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    OTP
                  </label>
                  <input
                    type="otp"
                    placeholder="OTP"
                    className="w-full mb-6 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  
                  
                  {/* Button */}
                  <button className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition" disabled={loading}>
                    {loading?"Verifying...":"Verify"}
                  </button>
                </div>
                </form>
              </div>
            </AuthLayout>
    );
}