function StatsCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>
    </div>
  );
}

export default StatsCard;
