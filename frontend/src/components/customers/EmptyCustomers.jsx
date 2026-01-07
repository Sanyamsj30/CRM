export default function EmptyCustomers() {
  return (
    <div className="bg-white border rounded-xl py-20 flex flex-col items-center text-center">
      <div className="text-5xl text-slate-300 mb-4">👥</div>
      <p className="text-slate-600 font-medium">No customers found</p>
      <p className="text-slate-400 text-sm mt-1 mb-6">
        Add your first customer to get started
      </p>
      <button className="flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm hover:bg-slate-50">
        ➕ Add Customer
      </button>
    </div>
  );
}
