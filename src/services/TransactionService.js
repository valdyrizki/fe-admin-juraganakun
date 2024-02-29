import { getToken } from "../Component/Helpers";
import http from "../http-common";

const get = () => {
  return http.get("/transaction/get", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getTransactionByRecord = (count) => {
  return http.get("/transaction/getbyrecord/" + count, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getTransactionByStatus = (status) => {
  return http.get("/transaction/getbystatus/" + status, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getTransactionsByInvoice = (invoice_id) => {
  return http.get("/transaction/getbyinvoice/" + invoice_id, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getTransactionByInvoice = (invoice_id) => {
  return http.get("/transaction/getbyinvoice", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      invoice_id: invoice_id,
    },
  });
};

const getTransactionByClientName = (client_name) => {
  return http.get("/transaction/getbyclientname/" + client_name, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getTransactionById = (transaction_id) => {
  return http.get("/transaction/getbyid", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      id: transaction_id,
    },
  });
};

const createTransaction = (data) => {
  return http.post("/transaction/store", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const updateTransaction = (data) => {
  return http.put("/transaction", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const deleteTransaction = (id) => {
  return http.delete("/transaction", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: {
      id: id,
    },
  });
};

const setPendingTransaction = (invoice_id) => {
  return http.put(
    "/transaction/setpending",
    { invoice_id: invoice_id },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );
};
const setConfirmTransaction = (invoice_id) => {
  return http.put(
    "/transaction/setconfirm",
    { invoice_id: invoice_id },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );
};
const setRefundTransaction = (invoice_id) => {
  return http.put(
    "/transaction/setrefund",
    { invoice_id: invoice_id },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );
};
const setCancelTransaction = (invoice_id) => {
  return http.put(
    "/transaction/setcancel",
    { invoice_id: invoice_id },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );
};
const getDownloadFileByCode = (code) => {
  return http.post(
    "/product/downloadbycode",
    { code: code },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      responseType: "arraybuffer",
    }
  );
};
const getDownloadAllFile = (invoice_id) => {
  return http.post(
    "/product/downloadbyinvoice",
    { invoice_id: invoice_id },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      responseType: "arraybuffer",
    }
  );
};

const TransactionService = {
  get,
  getTransactionById,
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionByRecord,
  getTransactionByStatus,
  getTransactionsByInvoice,
  getTransactionByInvoice,
  getTransactionByClientName,
  setPendingTransaction,
  setConfirmTransaction,
  setRefundTransaction,
  setCancelTransaction,
  getDownloadFileByCode,
  getDownloadAllFile,
};

export default TransactionService;
