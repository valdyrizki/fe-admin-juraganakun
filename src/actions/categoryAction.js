import CategoryService from "../services/CategoryService";
import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
} from "./types";

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: GET_CATEGORIES_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await CategoryService.getAll(); //axios call API
    //dispatch success
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getCategoryById = (category_id) => async (dispatch) => {
  dispatch({
    type: GET_CATEGORY_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await CategoryService.getCategoryById(category_id); //axios call API
    //dispatch success
    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const createCategory = (formCategory) => async (dispatch) => {
  dispatch({
    type: GET_CATEGORY_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await CategoryService.createCategory(formCategory);
    //dispatch success
    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  dispatch({
    type: GET_CATEGORY_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await CategoryService.deleteCategory(id);
    //dispatch success
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const updateCategory = (formCategory) => async (dispatch) => {
  dispatch({
    type: GET_CATEGORY_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await CategoryService.updateCategory(formCategory);
    //dispatch success
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const getCategoryOptions = () => async (dispatch) => {
  dispatch({
    type: GET_CATEGORIES_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await CategoryService.getAll(); //axios call API
    const categoryOptions = data.data.map((category) => ({
      id: category.category_id,
      value: category.category_name,
    }));

    //dispatch success
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: {
        loading: false,
        data: categoryOptions,
      },
    });

    return Promise.resolve(categoryOptions);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};
