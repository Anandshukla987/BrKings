import { toast } from "react-toastify";
import { Axios } from "../../utils/axiosconfig";

const login = async (user) => {
  const response = await Axios.post(`/user/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    toast.success("Login Success");
  }
  return response.data;
};

const signin = async (user) => {
  const response = await Axios.post(`/user/register`, user);
  if (response.data) {
    toast.success("User Register Successfully");
  }
  return response.data;
};

const logout = async () => {
  try {
    const response = await Axios.get(`/user/logout`);
    window.localStorage.clear("user");
    // console.log("status", response.status);

    return response.data;
  } catch (err) {
    console.log("Logout Error: ", err);
  }
};

const authService = {
  login,
  logout,
  signin,
};

export default authService;
