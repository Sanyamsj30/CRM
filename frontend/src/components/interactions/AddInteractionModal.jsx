import { useState } from "react";
import { createInteraction } from "../../api/interaction";

export default function AddInteraction({ customerId, onClose, onSaved }) {
  const [type, setType] = useState("note");
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);
      await createInteraction({
        customerId,
        type,
        content,
        scheduledAt: type === "meeting" ? scheduledAt : undefined,
      });
      onSaved();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Add Interaction
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Interaction Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="note">Note</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="meeting">Meeting</option>
          </select>
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Details
          </label>
          <textarea
            placeholder="What happened or what’s planned?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Scheduled time (only for meeting) */}
        {type === "meeting" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Schedule Meeting
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading || !content.trim()}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Interaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
