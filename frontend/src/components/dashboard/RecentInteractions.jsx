function RecentInteractions({ interactions }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">Recent Interactions</h3>

      {interactions.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent interactions</p>
      ) : (
        <ul className="space-y-3">
          {interactions.map((i) => (
            <li key={i._id} className="border-b pb-2">
              <p className="font-medium">{i.customerName}</p>
              <p className="text-sm text-gray-500">
                {i.type} • {new Date(i.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentInteractions;
