import { Axios } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (formData) => {
  const response = await Axios.post(`${base_url}upload/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // Should return an array of image details from Cloudinary
};
const deleteImg = async (id) => {
  const response = await Axios.delete(`${base_url}upload/delete-img/${id}`);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
