import axios from "axios";
import {Axios} from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const response = await Axios.post(`${base_url}upload/`, data);
  return response.data;
};
const deleteImg = async (id) => {
  const response = await Axios.delete(
    `${base_url}upload/delete-img/${id}`
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
