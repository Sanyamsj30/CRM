export default function FilterDropdown({ label, options, onSelect }) {
  return (
    <select
      value={label}
      onChange={(e) => onSelect(e.target.value)}
      className="px-4 py-2.5 border rounded-lg bg-white"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
