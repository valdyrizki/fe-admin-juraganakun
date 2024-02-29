import { getToken } from "../Component/Helpers";
import http from "../http-common";

const get = () => {
  return http.get("/role", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getRoleByUserId = (user_id) => {
  return http.get("/role/getbyuserid", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      id: user_id,
    },
  });
};

const createRole = (data) => {
  return http.post("/role", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const updateRole = (data) => {
  return http.put("/role", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const deleteRole = (id) => {
  return http.delete("/role", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: {
      id: id,
    },
  });
};

const RoleService = {
  get,
  getRoleByUserId,
  createRole,
  deleteRole,
  updateRole,
};

export default RoleService;
