import { useEffect, useState } from "react";
import Navbar from "../components/common/navbar";
import SearchBar from "../components/customers/searchBar";
import FilterDropdown from "../components/customers/FilterDropdown";
import EmptyCustomers from "../components/customers/EmptyCustomers";
import CustomerList from "../components/customers/CustomerList";
import AddCustomerModal from "../components/customers/AddCustomerModal";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
} from "../api/customers";
import toast from 'react-hot-toast';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [relationship, setRelationship] = useState("All Types");

  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

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

  const handleSaveCustomer = async (data) => {
    try {
      if (editCustomer) {
        await updateCustomer(editCustomer._id, data);
        toast.success("Customer updated");

      } else {
        await createCustomer(data);
        toast.success("Customer created");
      }
      setShowModal(false);
      setEditCustomer(null);
      loadCustomers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.error(err);
      throw err; // important so modal can also react
    }
  };

  const handleDelete = async (customer) => {
  const confirmed = window.confirm(
    `Delete ${customer.name}? This cannot be undone.`
  );

  if (!confirmed) return;

  try {
    await deleteCustomer(customer._id);
    loadCustomers();
  } catch (err) {
    alert("Failed to delete customer");
  }
};


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
            <CustomerList customers={customers} onEdit={setEditCustomer} onDelete={handleDelete}/>
          )}
        </div>
      </main>

      {/* Add / Edit Modal */}
      {(showModal || editCustomer) && (
        <AddCustomerModal
          initialData={editCustomer}
          onClose={() => {
            setShowModal(false);
            setEditCustomer(null);
          }}
          onSave={handleSaveCustomer}
        />
      )}
    </div>
  );
}
