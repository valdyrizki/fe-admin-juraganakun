import BankService from "../services/BankService";
import {
  CREATE_BANK_FAIL,
  CREATE_BANK_SUCCESS,
  DELETE_BANK_FAIL,
  DELETE_BANK_SUCCESS,
  GET_BANKS_FAIL,
  GET_BANKS_REQUEST,
  GET_BANKS_SUCCESS,
  GET_BANK_FAIL,
  GET_BANK_REQUEST,
  GET_BANK_SUCCESS,
  UPDATE_BANK_FAIL,
  UPDATE_BANK_SUCCESS,
} from "./types";

export const getBanks = () => async (dispatch) => {
  dispatch({
    type: GET_BANKS_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await BankService.getAll(); //axios call API
    //dispatch success
    dispatch({
      type: GET_BANKS_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_BANKS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getBankById = (bank_id) => async (dispatch) => {
  dispatch({
    type: GET_BANK_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await BankService.getBankById(bank_id); //axios call API
    //dispatch success
    dispatch({
      type: GET_BANK_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_BANK_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const createBank = (formBank) => async (dispatch) => {
  dispatch({
    type: GET_BANK_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await BankService.createBank(formBank);
    //dispatch success
    dispatch({
      type: CREATE_BANK_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_BANK_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const deleteBank = (id) => async (dispatch) => {
  dispatch({
    type: GET_BANK_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await BankService.deleteBank(id);
    //dispatch success
    dispatch({
      type: DELETE_BANK_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: DELETE_BANK_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const updateBank = (formBank) => async (dispatch) => {
  dispatch({
    type: GET_BANK_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await BankService.updateBank(formBank);
    //dispatch success
    dispatch({
      type: UPDATE_BANK_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: UPDATE_BANK_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const getBankOptions = () => async (dispatch) => {
  dispatch({
    type: GET_BANKS_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await BankService.getAll(); //axios call API
    // console.log("getBank");
    // console.log(data);
    const bankOptions = data.data.map((bank) => ({
      id: bank.id,
      value: bank.name,
    }));

    //dispatch success
    dispatch({
      type: GET_BANKS_SUCCESS,
      payload: {
        loading: false,
        data: bankOptions,
      },
    });

    return Promise.resolve(bankOptions);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_BANKS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};
