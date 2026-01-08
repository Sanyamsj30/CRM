function UpcomingMeetings({ meetings }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Upcoming Meetings</h2>

      <ul className="bg-white rounded-xl border divide-y">
        {meetings.map(m => (
          <li key={m._id} className="p-4">
            <p className="font-medium">{m.customerName}</p>
            <p className="text-sm text-slate-500">
              {new Date(m.scheduledAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default UpcomingMeetings;
