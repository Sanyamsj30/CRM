export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, email, or phone..."
        className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-400"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
    </div>
  );
}
