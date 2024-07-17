import axios from "axios";
import {Axios} from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const createProduct = async (product) => {
  console.log(product);
  const response = await Axios.post(`${base_url}product/`, product);

  return response.data;
};

const getProduct = async (id) => {
  const response = await Axios.get(`${base_url}product/${id}`);

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await Axios.delete(`${base_url}product/${id}`);

  return response.data;
};
const updateProduct = async (updateData) => {
  console.log(updateData);
  const response = await Axios.put(`${base_url}product/${updateData.id}`, updateData.pData);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
