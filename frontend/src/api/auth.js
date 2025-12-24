import axios from "axios";


const API = axios.create({
    baseURL:import.meta.env.VITE_API_URL_AUTH,

})

export const register = (data) => API.post("/register",data);

export const verifyEmail = (data) => API.post("/verify-email",data);

export const login = async(data) => {
    const res = await API.post("/login",data);
    localStorage.setItem("token",res.data.token);
    return res;
}

export const changePassword = (data) => API.post("/change-password",data,{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
    },
});
console.log("BASE URL:", API.defaults.baseURL);

export const forgotPassword = (data) =>
  API.post("/forgot-password", data);

export const resetPassword = (data) =>
  API.post("/reset-password", data);


