import {
  GET_BANKS_REQUEST,
  GET_BANKS_SUCCESS,
  GET_BANKS_FAIL,
  GET_BANK_REQUEST,
  GET_BANK_SUCCESS,
  GET_BANK_FAIL,
  CREATE_BANK_SUCCESS,
  CREATE_BANK_FAIL,
  UPDATE_BANK_SUCCESS,
  UPDATE_BANK_FAIL,
  DELETE_BANK_SUCCESS,
  DELETE_BANK_FAIL,
} from "../actions/types";

const initialState = {
  getBanksResult: false,
  getBanksError: false,
  getBanksLoading: false,
  getBankResult: false,
  getBankError: false,
  getBankLoading: false,
};

const bank = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANKS_REQUEST:
      return {
        ...state,
        getBanksResult: false,
        getBanksError: false,
        getBanksLoading: action.payload.loading,
      };
    case GET_BANKS_SUCCESS:
      return {
        ...state,
        getBanksResult: action.payload.data,
        getBanksError: false,
        getBanksLoading: action.payload.loading,
      };
    case GET_BANKS_FAIL:
      return {
        ...state,
        getBanksResult: false,
        getBanksError: action.payload.data,
        getBanksLoading: action.payload.loading,
      };
    case GET_BANK_REQUEST:
      return {
        ...state,
        getBankResult: false,
        getBankError: false,
        getBankLoading: action.payload.loading,
      };
    case GET_BANK_SUCCESS:
      return {
        ...state,
        getBankResult: action.payload.data,
        getBankError: false,
        getBankLoading: action.payload.loading,
      };
    case GET_BANK_FAIL:
      return {
        ...state,
        getBankResult: false,
        getBankError: action.payload.data,
        getBankLoading: action.payload.loading,
      };
    case CREATE_BANK_SUCCESS:
      return {
        ...state,
        getBankResult: action.payload.data,
        getBankError: false,
        getBankLoading: action.payload.loading,
      };
    case CREATE_BANK_FAIL:
      return {
        ...state,
        getBankResult: false,
        getBankError: action.payload.data,
        getBankLoading: action.payload.loading,
      };
    case UPDATE_BANK_SUCCESS:
      return {
        ...state,
        getBankResult: action.payload.data,
        getBankError: false,
        getBankLoading: action.payload.loading,
      };
    case UPDATE_BANK_FAIL:
      return {
        ...state,
        getBankResult: false,
        getBankError: action.payload.data,
        getBankLoading: action.payload.loading,
      };
    case DELETE_BANK_SUCCESS:
      return {
        ...state,
        getBankResult: action.payload.data,
        getBankError: false,
        getBankLoading: action.payload.loading,
      };
    case DELETE_BANK_FAIL:
      return {
        ...state,
        getBankResult: false,
        getBankError: action.payload.data,
        getBankLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default bank;
