import axios from "./axiosInstance";

export const fetchCustomers = async (params = {}) => {
  const res = await axios.get("/customers", { params });
  return res.data.data;
};

export const createCustomer = async (payload) => {
  const res = await axios.post("/customers", payload);
  return res.data.data;
};
