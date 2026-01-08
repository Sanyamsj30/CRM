import { useState } from "react";
import { rescheduleInteraction } from "../../api/interaction";

export default function RescheduleMeetingModal({
  interaction,
  onClose,
  onSaved,
}) {
  const [scheduledAt, setScheduledAt] = useState(
    interaction.scheduledAt?.slice(0, 16)
  );
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!scheduledAt) return;

    try {
      setLoading(true);
      await rescheduleInteraction(interaction._id, scheduledAt);
      onSaved();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Reschedule Meeting</h2>

        <label className="block text-sm mb-1">New Date & Time</label>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-slate-600">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Reschedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
