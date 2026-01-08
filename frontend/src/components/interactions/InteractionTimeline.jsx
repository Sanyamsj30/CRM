import {
  completeInteraction,
  deleteInteraction,
} from "../../api/interaction";

export default function InteractionTimeline({ interactions, onRefresh }) {
  return (
    <div className="space-y-3">
      {interactions.map((i) => (
        <div
          key={i._id}
          className="bg-white border rounded-lg p-4"
        >
          <div className="flex justify-between items-center">
            <p className="font-medium capitalize">{i.type}</p>
            <span className="text-xs text-slate-500">
              {new Date(i.createdAt).toLocaleString()}
            </span>
          </div>

          <p className="mt-2 text-slate-700">
            {i.content}
          </p>

          {i.status === "pending" && i.scheduledAt && (
            <button
              className="text-emerald-600 text-sm mt-2"
              onClick={async () => {
                await completeInteraction(i._id);
                onRefresh();
              }}
            >
              Mark completed
            </button>
          )}

          <button
            className="text-red-600 text-sm mt-2 ml-4"
            onClick={async () => {
              await deleteInteraction(i._id);
              onRefresh();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
