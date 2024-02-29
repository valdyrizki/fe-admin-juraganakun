import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from "../actions/types";

const initialState = {
  getCategoriesResult: false,
  getCategoriesError: false,
  getCategoriesLoading: false,
  getCategoryResult: false,
  getCategoryError: false,
  getCategoryLoading: false,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        getCategoriesResult: false,
        getCategoriesError: false,
        getCategoriesLoading: action.payload.loading,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        getCategoriesResult: action.payload.data,
        getCategoriesError: false,
        getCategoriesLoading: action.payload.loading,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        getCategoriesResult: false,
        getCategoriesError: action.payload.data,
        getCategoriesLoading: action.payload.loading,
      };
    case GET_CATEGORY_REQUEST:
      return {
        ...state,
        getCategoryResult: false,
        getCategoryError: false,
        getCategoryLoading: action.payload.loading,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        getCategoryResult: action.payload.data,
        getCategoryError: false,
        getCategoryLoading: action.payload.loading,
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        getCategoryResult: false,
        getCategoryError: action.payload.data,
        getCategoryLoading: action.payload.loading,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        getCategoryResult: action.payload.data,
        getCategoryError: false,
        getCategoryLoading: action.payload.loading,
      };
    case CREATE_CATEGORY_FAIL:
      return {
        ...state,
        getCategoryResult: false,
        getCategoryError: action.payload.data,
        getCategoryLoading: action.payload.loading,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        getCategoryResult: action.payload.data,
        getCategoryError: false,
        getCategoryLoading: action.payload.loading,
      };
    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        getCategoryResult: false,
        getCategoryError: action.payload.data,
        getCategoryLoading: action.payload.loading,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        getCategoryResult: action.payload.data,
        getCategoryError: false,
        getCategoryLoading: action.payload.loading,
      };
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        getCategoryResult: false,
        getCategoryError: action.payload.data,
        getCategoryLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default category;
