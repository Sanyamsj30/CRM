import { useState } from "react";
export default function AddCustomerModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    relationship: "Prospect",
    status: "Lead",
  });

  const submit = () => {
    console.log("Save clicked", form);
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Customer</h2>

        <input
          placeholder="Name"
          className="w-full mb-3 border p-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 border p-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          className="w-full mb-3 border p-2 rounded"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <div className="flex gap-3 mt-4">
          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded"
            onClick={submit}
          >
            Save
          </button>
          <button
            className="border px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
