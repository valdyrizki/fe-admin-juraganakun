import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../actions/types";

const initialState = {
  getProductsResult: false,
  getProductsError: false,
  getProductsLoading: false,
  getProductResult: false,
  getProductError: false,
  getProductLoading: false,
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        getProductsResult: false,
        getProductsError: false,
        getProductsLoading: action.payload.loading,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        getProductsResult: action.payload.data,
        getProductsError: false,
        getProductsLoading: action.payload.loading,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        getProductsResult: false,
        getProductsError: action.payload.data,
        getProductsLoading: action.payload.loading,
      };
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        getProductResult: false,
        getProductError: false,
        getProductLoading: action.payload.loading,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        getProductResult: action.payload.data,
        getProductError: false,
        getProductLoading: action.payload.loading,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        getProductResult: false,
        getProductError: action.payload.data,
        getProductLoading: action.payload.loading,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        getProductResult: action.payload.data,
        getProductError: false,
        getProductLoading: action.payload.loading,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        getProductResult: false,
        getProductError: action.payload.data,
        getProductLoading: action.payload.loading,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        getProductResult: action.payload.data,
        getProductError: false,
        getProductLoading: action.payload.loading,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        getProductResult: false,
        getProductError: action.payload.data,
        getProductLoading: action.payload.loading,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        getProductResult: action.payload.data,
        getProductError: false,
        getProductLoading: action.payload.loading,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        getProductResult: false,
        getProductError: action.payload.data,
        getProductLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default product;
