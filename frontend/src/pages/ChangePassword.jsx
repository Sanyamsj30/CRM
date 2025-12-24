import { useState } from "react";
import { changePassword } from "../api/auth";

export default function ChangePassword() {
    const [form,setForm] = useState({
        oldPassword:"",
        newPassword:""
    });
    const [loading,setLoading] = useState(false);

     const submit = async (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword) {
      alert("All fields are required");
      return;
    }

    if (form.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await changePassword(form);
      alert("Password changed successfully");
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return(
    <form onSubmit={submit}>
      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        value={form.oldPassword}
        onChange={(e) =>
          setForm({ ...form, oldPassword: e.target.value })
        }
        disabled={loading}
      />

      <input
        type="password"
        placeholder="New Password"
        value={form.newPassword}
        onChange={(e) =>
          setForm({ ...form, newPassword: e.target.value })
        }
        disabled={loading}
      />

      <button disabled={loading}>
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
}