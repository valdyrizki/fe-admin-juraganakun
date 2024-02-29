import ReplicateService from "../services/ReplicateService";
import {
  CREATE_REPLICATE_FAIL,
  CREATE_REPLICATE_SUCCESS,
  GET_REPLICATE_REQUEST,
} from "./types";

export const generateImage = (prompt) => async (dispatch) => {
  dispatch({
    type: GET_REPLICATE_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await ReplicateService.generateImage(prompt);
    //dispatch success
    dispatch({
      type: CREATE_REPLICATE_SUCCESS,
      payload: {
        loading: true,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_REPLICATE_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.resolve(response);
  }
};

export const enhanceImage = (img) => async (dispatch) => {
  dispatch({
    type: GET_REPLICATE_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await ReplicateService.enhanceImage(img);
    //dispatch success
    dispatch({
      type: CREATE_REPLICATE_SUCCESS,
      payload: {
        loading: true,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_REPLICATE_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.resolve(response);
  }
};

export const getReplicateById = (id) => async (dispatch) => {
  dispatch({
    type: GET_REPLICATE_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await ReplicateService.getReplicateById(id);
    //dispatch success
    dispatch({
      type: CREATE_REPLICATE_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_REPLICATE_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.resolve(response);
  }
};
