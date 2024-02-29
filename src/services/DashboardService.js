import { getToken } from "../Component/Helpers";
import http from "../http-common";

const getAll = () => {
  return http.get("/home/getall", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const DashboardService = {
  getAll,
};

export default DashboardService;
