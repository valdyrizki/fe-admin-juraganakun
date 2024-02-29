import AuthService from "../services/AuthService";
import {
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAIL,
  DO_LOGOUT,
  POST_LOGIN_REQUEST,
} from "./types";

export const postLogin = (req) => async (dispatch) => {
  dispatch({
    type: POST_LOGIN_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await AuthService.loginAdmin(req);
    const auth = {
      isAuth: true,
      data: data,
      user: data.data,
      token: data.token,
    };
    await localStorage.setItem("auth", JSON.stringify(auth));

    //dispatch success
    dispatch({
      type: POST_LOGIN_SUCCESS,
      payload: {
        loading: false,
        data: auth,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: POST_LOGIN_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const postLogout = () => (dispatch) => {
  localStorage.removeItem("auth");

  dispatch({
    type: DO_LOGOUT,
    payload: {
      loading: false,
      data: false,
    },
  });
};
