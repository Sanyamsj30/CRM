import { useState } from "react";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function AddCustomerModal({ onClose, onSave,initialData }) {
  const [form, setForm] = useState(
    initialData || {
    name: "",
    email: "",
    phone: "",
    relationship: "Prospect",
    status: "Lead",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");

    // Name validation
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    // Email / phone presence
    if (!form.email && !form.phone) {
      setError("Email or phone is required");
      return;
    }

    // Email format validation
    if (form.email && !isValidEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Phone length validation (optional but sensible)
    if (form.phone && form.phone.length < 7) {
      setError("Phone number looks invalid");
      return;
    }

    try {
      setLoading(true);
      await onSave(form);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create customer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Customer</h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {/* Name */}
        <input
          className="w-full mb-3 border p-2 rounded"
          placeholder="Name *"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Email */}
        <input
          className="w-full mb-3 border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Phone */}
        <input
          className="w-full mb-3 border p-2 rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value.replace(/\D/g, ""),
            })
          }
        />

        {/* Relationship dropdown */}
        <label className="block text-sm text-slate-600 mb-1">
          Relationship
        </label>
        <select
          className="w-full mb-4 border p-2 rounded bg-white"
          value={form.relationship}
          onChange={(e) =>
            setForm({ ...form, relationship: e.target.value })
          }
        >
          <option value="Client">Client</option>
          <option value="Prospect">Prospect</option>
          <option value="Vendor">Vendor</option>
          <option value="Partner">Partner</option>
          <option value="Personal">Personal</option>
          <option value="Recruiter">Recruiter</option>
        </select>

        <label className="block text-sm text-slate-600 mb-1">
          Status
        </label>
        <select
          className="w-full mb-4 border p-2 rounded bg-white"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="Lead">Lead</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="border px-4 py-2 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded text-white ${
              loading
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
