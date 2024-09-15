import axios from "axios";
import { toast } from "react-toastify";
import { Axios } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await Axios.post(`${base_url}product/`, product);
  if (response.data) {
    toast.success("Product Added Successfully!");
  }
  return response.data;
};

const getProduct = async (id) => {
  const response = await Axios.get(`${base_url}product/${id}`);

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await Axios.delete(`${base_url}product/${id}`);
  if (response.data) {
    toast.info("Product Deleted Successfully!");
  }
  return response.data;
};
const updateProduct = async (updateData) => {
  console.log(updateData);
  const response = await Axios.put(
    `${base_url}product/${updateData.id}`,
    updateData.pData
  );
  if (response.data) {
    toast.success("Product Updated Successfully!");
  }
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
