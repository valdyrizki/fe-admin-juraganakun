import {
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
} from "../actions/types";

const initialState = {
  getTransactionsResult: false,
  getTransactionsError: false,
  getTransactionsLoading: false,
  getTransactionResult: false,
  getTransactionError: false,
  getTransactionLoading: false,
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
      return {
        ...state,
        getTransactionsResult: false,
        getTransactionsError: false,
        getTransactionsLoading: action.payload.loading,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        getTransactionsResult: action.payload.data,
        getTransactionsError: false,
        getTransactionsLoading: action.payload.loading,
      };
    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        getTransactionsResult: false,
        getTransactionsError: action.payload.data,
        getTransactionsLoading: action.payload.loading,
      };
    case GET_TRANSACTION_REQUEST:
      return {
        ...state,
        getTransactionResult: false,
        getTransactionError: false,
        getTransactionLoading: action.payload.loading,
      };
    case GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        getTransactionResult: action.payload.data,
        getTransactionError: false,
        getTransactionLoading: action.payload.loading,
      };
    case GET_TRANSACTION_FAIL:
      return {
        ...state,
        getTransactionResult: false,
        getTransactionError: action.payload.data,
        getTransactionLoading: action.payload.loading,
      };
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        getTransactionResult: action.payload.data,
        getTransactionError: false,
        getTransactionLoading: action.payload.loading,
      };
    case CREATE_TRANSACTION_FAIL:
      return {
        ...state,
        getTransactionResult: false,
        getTransactionError: action.payload.data,
        getTransactionLoading: action.payload.loading,
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        getTransactionResult: action.payload.data,
        getTransactionError: false,
        getTransactionLoading: action.payload.loading,
      };
    case UPDATE_TRANSACTION_FAIL:
      return {
        ...state,
        getTransactionResult: false,
        getTransactionError: action.payload.data,
        getTransactionLoading: action.payload.loading,
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        getTransactionResult: action.payload.data,
        getTransactionError: false,
        getTransactionLoading: action.payload.loading,
      };
    case DELETE_TRANSACTION_FAIL:
      return {
        ...state,
        getTransactionResult: false,
        getTransactionError: action.payload.data,
        getTransactionLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default transaction;
