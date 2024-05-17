import { API } from "../API";

export const getCategoties = async () => {
  const data = await API.get("categories");
  return data.data;
};
