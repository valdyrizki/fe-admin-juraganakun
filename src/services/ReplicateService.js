import { getToken } from "../Component/Helpers";
import http from "../http-common";

const generateImage = (prompt) => {
  return http.post(
    "/ai/generateimage",
    { prompt: prompt },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );
};

const enhanceImage = (img) => {
  return http.post(
    "/ai/enhanceimage",
    { img: img },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const getReplicateById = (id) => {
  return http.get("/ai/getreplicatebyid", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      id: id,
    },
  });
};

const ReplicateService = {
  generateImage,
  getReplicateById,
  enhanceImage,
};

export default ReplicateService;
