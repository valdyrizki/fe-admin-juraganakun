import TransactionService from "../services/TransactionService";
import {
  CREATE_TRANSACTION_FAIL,
  CREATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_SUCCESS,
  GET_FILES_FAIL,
  GET_FILES_REQUEST,
  GET_FILES_SUCCESS,
  GET_FILE_FAIL,
  GET_FILE_REQUEST,
  GET_FILE_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTION_FAIL,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_SUCCESS,
} from "./types";

export const getTransactions = () => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTIONS_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await TransactionService.getAll(); //axios call API
    //dispatch success
    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_TRANSACTIONS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getTransactionsByRecord = (count) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTIONS_REQUEST,
    payload: {
      loading: true,
    },
  });

  let response = null;
  try {
    if (count === 999) {
      response = await TransactionService.get(); //axios call API
    } else {
      response = await TransactionService.getTransactionByRecord(count); //axios call API
    }
    //dispatch success
    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: {
        loading: false,
        data: response.data,
      },
    });

    return Promise.resolve(response.data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_TRANSACTIONS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getTransactionsByStatus = (status) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTIONS_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await TransactionService.getTransactionByStatus(status); //axios call API
    //dispatch success
    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_TRANSACTIONS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getTransactionsByInvoice = (invoice) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTIONS_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await TransactionService.getTransactionsByInvoice(invoice); //axios call API
    //dispatch success
    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_TRANSACTIONS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getTransactionByInvoice = (invoice) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await TransactionService.getTransactionByInvoice(invoice); //axios call API
    //dispatch success
    dispatch({
      type: GET_TRANSACTION_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_TRANSACTION_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getTransactionsByClientName = (client_name) => async (
  dispatch
) => {
  dispatch({
    type: GET_TRANSACTIONS_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await TransactionService.getTransactionByClientName(
      client_name
    ); //axios call API
    //dispatch success
    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_TRANSACTIONS_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getTransactionById = (product_id) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await TransactionService.getTransactionById(product_id); //axios call API
    //dispatch success
    dispatch({
      type: GET_TRANSACTION_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_TRANSACTION_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const createTransaction = (formTransaction) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await TransactionService.createTransaction(
      formTransaction
    );
    //dispatch success
    dispatch({
      type: CREATE_TRANSACTION_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_TRANSACTION_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const deleteTransaction = (id) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await TransactionService.deleteTransaction(id);
    //dispatch success
    dispatch({
      type: DELETE_TRANSACTION_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: DELETE_TRANSACTION_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const updateTransaction = (formTransaction) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await TransactionService.updateTransaction(
      formTransaction
    );
    //dispatch success
    dispatch({
      type: UPDATE_TRANSACTION_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: UPDATE_TRANSACTION_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const setPendingTransaction = (invoice_id) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await TransactionService.setPendingTransaction(invoice_id);
    //dispatch success
    dispatch({
      type: GET_TRANSACTION_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: GET_TRANSACTION_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const setConfirmTransaction = (invoice_id) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await TransactionService.setConfirmTransaction(invoice_id);
    //dispatch success
    dispatch({
      type: GET_TRANSACTION_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: GET_TRANSACTION_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const setRefundTransaction = (invoice_id) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await TransactionService.setRefundTransaction(invoice_id);
    //dispatch success
    dispatch({
      type: GET_TRANSACTION_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: GET_TRANSACTION_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const setCancelTransaction = (invoice_id) => async (dispatch) => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await TransactionService.setCancelTransaction(invoice_id);
    //dispatch success
    dispatch({
      type: GET_TRANSACTION_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: GET_TRANSACTION_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const getDownloadFileByCode = (code) => async (dispatch) => {
  dispatch({
    type: GET_FILE_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const response = await TransactionService.getDownloadFileByCode(code);
    //dispatch success
    dispatch({
      type: GET_FILE_SUCCESS,
      payload: {
        loading: false,
        data: response,
      },
    });

    return Promise.resolve(response);
  } catch ({ response }) {
    dispatch({
      type: GET_FILE_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const getDownloadAllFile = (invoice_id) => async (dispatch) => {
  dispatch({
    type: GET_FILES_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const response = await TransactionService.getDownloadAllFile(invoice_id);
    // console.log(response);
    //dispatch success
    dispatch({
      type: GET_FILES_SUCCESS,
      payload: {
        loading: false,
        data: response,
      },
    });

    return Promise.resolve(response);
  } catch ({ response }) {
    dispatch({
      type: GET_FILES_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};
