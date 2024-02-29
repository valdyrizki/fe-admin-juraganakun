import { getToken } from "../Component/Helpers";
import http from "../http-common";

const getAll = () => {
  return http.get("/user/getall", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getUserById = (user_id) => {
  return http.get("/user/getbyid", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      id: user_id,
    },
  });
};

const createUser = (data) => {
  return http.post("/user", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const updateUser = (data) => {
  return http.put("/user", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const deleteUser = (id) => {
  return http.delete("/user", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: {
      id: id,
    },
  });
};

const UserService = {
  getAll,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};

export default UserService;
