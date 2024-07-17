import axios from 'axios';

const Axios = axios.create({});

Axios.interceptors.request.use((req)=>{
  const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const token = getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : "";
  req.headers.Authorization=`Bearer ${token}`;
  return req;
})

export default Axios;