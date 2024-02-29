import http from "../http-common";

const loginAdmin = (data) => {
  return http.post("/auth/loginadmin", data);
};

const AuthService = {
  loginAdmin,
};

export default AuthService;
