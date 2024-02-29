import UserService from "../services/UserService";
import {
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "./types";

export const getUsers = () => async (dispatch) => {
  dispatch({
    type: GET_USERS_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await UserService.getAll(); //axios call API
    //dispatch success
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_USERS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getUserById = (user_id) => async (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await UserService.getUserById(user_id); //axios call API
    //dispatch success
    dispatch({
      type: GET_USER_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_USER_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const createUser = (formUser) => async (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await UserService.createUser(formUser);
    //dispatch success
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await UserService.deleteUser(id);
    //dispatch success
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const updateUser = (formUser) => async (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await UserService.updateUser(formUser);
    //dispatch success
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};
