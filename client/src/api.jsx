import axios from "axios";

const API = axios.create({
  baseURL: (window.location.hostname==="localhost" ? 
     "http://localhost:5000/api" :
     "https://teamsync-production-592e.up.railway.app/api" )
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;