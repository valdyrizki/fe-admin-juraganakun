import { getToken } from "../Component/Helpers";
import http from "../http-common";

const getAll = () => {
  return http.get("/bank/getall", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getBankById = (bank_id) => {
  return http.get("/bank/getbyid", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      id: bank_id,
    },
  });
};

const getBankByCategory = (category_id) => {
  return http.get("/bank/getbycategory", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      category_id: category_id,
    },
  });
};

const createBank = (data) => {
  return http.post("/bank", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const updateBank = (data) => {
  return http.put("/bank", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const deleteBank = (id) => {
  return http.delete("/bank", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: {
      id: id,
    },
  });
};

const BankService = {
  getAll,
  getBankById,
  createBank,
  deleteBank,
  updateBank,
  getBankByCategory,
};

export default BankService;
