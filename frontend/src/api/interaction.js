import axios from "./axiosInstance";

export const createInteraction = (data) =>
  axios.post("/interactions", data);

export const fetchCustomerInteractions = async (customerId) => {
  const res = await axios.get(`/interactions/customer/${customerId}`);
  return res.data.data; // THIS LINE MATTERS
};

export const completeInteraction = (id) =>
  axios.put(`/interactions/${id}/status`, { status: "completed" });

export const deleteInteraction = (id) =>
  axios.delete(`/interactions/${id}`);

export const rescheduleInteraction = (id, scheduledAt) =>
  axios.put(`/interactions/${id}/reschedule`, { scheduledAt });
