import axios from "./axiosInstance";

export const fetchCustomers = async (params = {}) => {
  const res = await axios.get("/customers", { params });
  return res.data.data;
};

export const createCustomer = async (payload) => {
  const res = await axios.post("/customers", payload);
  return res.data.data;
};

export const updateCustomer = async (id, payload) => {
  const res = await axios.put(`/customers/${id}`, payload);
  return res.data.data;
}

export const deleteCustomer = async (id) => {
  const res = await axios.delete(`/customers/${id}`);
  return res.data.data;
}
