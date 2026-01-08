import axios from "./axiosInstance";

export const createInteraction = (data) =>
  axios.post("/interactions", data);

export const fetchCustomerInteractions = async (customerId) => {
  const res = await axios.get(`/interactions/customer/${customerId}`);
  return res.data.data; // THIS LINE MATTERS
};

export const completeInteraction = (id) =>
  axios.put(`/interactions/${id}/complete`);

export const deleteInteraction = (id) =>
  axios.delete(`/interactions/${id}`);
