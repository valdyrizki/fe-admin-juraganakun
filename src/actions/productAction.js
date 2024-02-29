import ProductService from "../services/ProductService";
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
} from "./types";

export const getProducts = () => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await ProductService.getAll(); //axios call API
    //dispatch success
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getProductById = (product_id) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await ProductService.getProductById(product_id); //axios call API
    //dispatch success
    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const createProduct = (formProduct) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await ProductService.createProduct(formProduct);
    //dispatch success
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await ProductService.deleteProduct(id);
    //dispatch success
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const updateProduct = (formProduct) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await ProductService.updateProduct(formProduct);
    //dispatch success
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const getProductOptionsByCategory = (category_id) => async (
  dispatch
) => {
  dispatch({
    type: GET_PRODUCTS_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await ProductService.getProductByCategory(category_id); //axios call API
    // console.log("getProductByCategory");
    // console.log(data);
    const productOptionsByCategory = data.data.map((product) => ({
      id: product.product_id,
      value: product.product_name,
      attrb1: product.price,
      attrb2: product.stock,
    }));

    //dispatch success
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: {
        loading: false,
        data: productOptionsByCategory,
      },
    });

    return Promise.resolve(productOptionsByCategory);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const storeStock = (inputs) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await ProductService.storeStock(inputs);
    //dispatch success
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};
