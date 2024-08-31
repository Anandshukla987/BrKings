import { Axios } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
import { toast } from "react-toastify";

const login = async (user) => {
  const response = await Axios.post(`/user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    toast.success("Login Success");
  }
  return response.data;
};

const logout = async () => {
  try {
    const response = await Axios.get(`${base_url}user/logout`);
    window.localStorage.clear("user");
    console.log("status", response.status);

    return response.data;
  } catch (err) {
    console.log("Logout Error: ", err);
  }
};

const getOrders = async () => {
  const response = await Axios.get(`${base_url}user/getallorders`);

  return response.data;
};
const getOrder = async (id) => {
  const response = await Axios.post(`${base_url}user/getorderbyuser/${id}`, "");

  console.log("order response", response.data);
  return response.data;
};

const authService = {
  login,
  logout,
  getOrders,
  getOrder,
};

export default authService;
