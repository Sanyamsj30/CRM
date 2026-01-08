import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/common/navbar";

import { fetchCustomerById } from "../api/customers";
import { fetchCustomerInteractions } from "../api/interaction";

import InteractionTimeline from "../components/interactions/InteractionTimeline";
import AddInteractionModal from "../components/interactions/AddInteractionModal";

export default function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddInteraction, setShowAddInteraction] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const customerRes = await fetchCustomerById(id);
      const interactionRes = await fetchCustomerInteractions(id);

      setCustomer(customerRes);
      setInteractions(interactionRes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="p-6 text-slate-500">Loading customer…</p>
      </>
    );
  }

  if (!customer) {
    return (
      <>
        <Navbar />
        <p className="p-6 text-red-500">Customer not found</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Customer Info */}
        <div className="bg-white border rounded-xl p-6">
          <h1 className="text-2xl font-semibold">{customer.name}</h1>

          <div className="mt-2 text-slate-600 space-y-1">
            {customer.email && <p>Email: {customer.email}</p>}
            {customer.phone && <p>Phone: {customer.phone}</p>}
            <p>Status: {customer.status}</p>
            <p>Relationship: {customer.relationship}</p>
          </div>
        </div>

        {/* Interaction Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Interactions</h2>

          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowAddInteraction(true)}
          >
            ➕ Add Interaction
          </button>
        </div>

        {/* Interaction Timeline */}
        {interactions.length === 0 ? (
          <p className="text-slate-500">No interactions yet.</p>
        ) : (
          <InteractionTimeline
            interactions={interactions}
            onRefresh={loadData}
          />
        )}
      </div>

      {/* Add Interaction Modal */}
      {showAddInteraction && (
        <AddInteractionModal
          customerId={id}
          onClose={() => setShowAddInteraction(false)}
          onSaved={() => {
            setShowAddInteraction(false);
            loadData();
          }}
        />
      )}
    </>
  );
}
