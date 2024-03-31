import { getToken } from "../Component/Helpers";
import http from "../http-common";

const getAll = () => {
  return http.get("/product/getall", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getProductById = (product_id) => {
  return http.get("/product/getbyid", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      id: product_id,
    },
  });
};
const getProductByCode = (product_id) => {
  return http.get("/product/getbycode", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      id: product_id,
    },
  });
};
const getProductByCategory = (category_id) => {
  return http.get("/product/getbycategory", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      category_id: category_id,
    },
  });
};

const createProduct = (data) => {
  return http.post("/product", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateProduct = (data) => {
  return http.post("/product/update", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteProduct = (id) => {
  return http.delete("/product/destroy", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: {
      id: id,
    },
  });
};

const storeStock = (data) => {
  return http.post("/product/storestock", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "multipart/form-data",
    },
  });
};

const ProductService = {
  getAll,
  getProductById,
  getProductByCode,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory,
  storeStock,
};

export default ProductService;
