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
