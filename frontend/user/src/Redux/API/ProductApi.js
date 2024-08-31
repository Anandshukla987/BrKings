import axios from "axios";
import { Axios } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const getProduct = async (id) => {
  const response = await Axios.get(`${base_url}product/${id}`);

  return response.data;
};

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};

const productApi = {
  getProducts,
  getProduct,
  getProductCategories,
};

export default productApi;
