import axiosInstance from "./axiosInstance";

export const fetchDashboardData = async () => {
  const res = await axiosInstance.get("/dashboard");
  return res.data.data;
};
