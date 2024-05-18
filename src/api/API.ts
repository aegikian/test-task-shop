import axios from "axios";

const TOKEN = import.meta.env.VITE_APP_PUBLIC_TOKEN;
const URL = import.meta.env.VITE_APP_BASE_URL;

export const API = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/json",
  },
});

API.interceptors.response.use((res) => {
  if (res.status >= 400) console.error(res.data);
  return res;
});
