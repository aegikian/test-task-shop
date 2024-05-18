import { API } from "../API";
import { ICategoryListResponse } from "./categoryTypes";

export const getCategories = async (id: string | number = 0) => {
  const { data } = await API.get<ICategoryListResponse>(`categories`, {
    params: {
      parentCategoryId: id,
      returnProductIds: true,
    },
  });
  return data;
};
