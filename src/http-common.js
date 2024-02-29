import axios from "axios";
import { getBaseUrl } from "./Component/Helpers";

export default axios.create({
  baseURL: getBaseUrl() + "api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: "120000",
});
