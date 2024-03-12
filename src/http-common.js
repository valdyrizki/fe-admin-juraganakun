import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: "120000",
});
