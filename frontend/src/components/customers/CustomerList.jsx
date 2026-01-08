import { useNavigate } from "react-router-dom";


export default function CustomerList({ customers, onEdit ,onDelete}) {
  const navigate = useNavigate();
  return (
    
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr >
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">Email</th>
            <th className="text-left px-4 py-3">Phone</th>
            <th className="text-left px-4 py-3">Relationship</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr onClick={() => navigate(`/customers/${c._id}`)}
      className="cursor-pointer hover:bg-slate-50" key={c._id} >
              <td className="px-4 py-3 font-medium">{c.name}</td>
              <td className="px-4 py-3">{c.email || "—"}</td>
              <td className="px-4 py-3">{c.phone || "—"}</td>
              <td className="px-4 py-3">{c.relationship}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    c.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : c.status === "Inactive"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  className="text-emerald-600 hover:underline"
                  onClick={(e) => 
                    {
                      e.stopPropagation();
                      onEdit(c)}}
                >
                  Edit
                </button>
                <button
                    className="text-red-600 hover:underline ml-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(c);
                    }}
                    >
                    Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
  );
}
