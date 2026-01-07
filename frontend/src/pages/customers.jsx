import { useEffect, useState } from "react";
import Navbar from "../components/common/navbar";
import SearchBar from "../components/customers/searchBar";
import FilterDropdown from "../components/customers/FilterDropdown";
import EmptyCustomers from "../components/customers/EmptyCustomers";
import { fetchCustomers } from "../api/customers";

import { createCustomer } from "../api/customers";
import AddCustomerModal from "../components/customers/AddCustomerModal";






export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [relationship, setRelationship] = useState("All Types");
  const [showModal, setShowModal] = useState(false);

const handleCreate = async (payload) => {
   try {
    await createCustomer(payload);
    setShowModal(false);
    loadCustomers();//refresh list
  } catch (err) {
    console.error("FULL ERROR:", err.response);
    alert(err.response?.data?.message);
  }
};

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await fetchCustomers({
        search,
        status,
        relationship,
      });
      setCustomers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [search, status, relationship]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Customers</h1>
            <p className="text-slate-500 mt-1">
              Manage your contacts and relationships
            </p>
          </div>

          <button
            className="bg-emerald-500 text-white px-4 py-2.5 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            ➕ Add Customer
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mt-8">
          <SearchBar value={search} onChange={setSearch} />

          <FilterDropdown
            label={status}
            options={["All Status", "Lead", "Active", "Inactive"]}
            onSelect={setStatus}
          />

          <FilterDropdown
            label={relationship}
            options={[
              "All Types",
              "Client",
              "Prospect",
              "Vendor",
              "Partner",
              "Personal",
              "Recruiter",
            ]}
            onSelect={setRelationship}
          />
        </div>

        {/* Content */}
        <div className="mt-6">
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : customers.length === 0 ? (
            <EmptyCustomers />
          ) : (
            <pre>{JSON.stringify(customers, null, 2)}</pre>
          )}
        </div>
      </main>
      {showModal && (
        <AddCustomerModal
          onClose={() => setShowModal(false)}
          onSave={handleCreate}
        />
      )}
    </div>
  );
}
