import { getToken } from "../Component/Helpers";
import http from "../http-common";

const getAll = () => {
  return http.get("/category/getall", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getCategoryById = (category_id) => {
  return http.get("/category/getbyid", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      category_id: category_id,
    },
  });
};

const createCategory = (data) => {
  return http.post("/category", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const updateCategory = (data) => {
  return http.put("/category", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const deleteCategory = (category_id) => {
  return http.delete("/category", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: {
      category_id: category_id,
    },
  });
};

const CategoryService = {
  getAll,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};

export default CategoryService;
