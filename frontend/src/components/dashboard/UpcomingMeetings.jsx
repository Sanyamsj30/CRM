function UpcomingMeetings({ meetings }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">Upcoming Meetings</h3>

      {meetings.length === 0 ? (
        <p className="text-gray-500 text-sm">No upcoming meetings</p>
      ) : (
        <ul className="space-y-3">
          {meetings.map((m) => (
            <li key={m._id} className="border-b pb-2">
              <p className="font-medium">{m.customerName}</p>
              <p className="text-sm text-gray-500">
                {new Date(m.scheduledAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UpcomingMeetings;
