import { getToken } from "../Component/Helpers";
import http from "../http-common";

const getFiles = () => {
  return http.get("/file", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getPreviewFile = (product_id, qty) => {
  return http.get("/file/getpreviewfile", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      product_id: product_id,
      qty: qty,
    },
  });
};

const getFilesByRecord = (record) => {
  return http.get("/file/getbyrecord/" + record, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

const getFilesByInvoice = (invoice_id) => {
  return http.get("/file/getbyinvoice", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      invoice_id: invoice_id,
    },
  });
};

const getFilesByFileName = (filename) => {
  return http.get("/file/getbyfilename", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: {
      filename: filename,
    },
  });
};

const FileService = {
  getPreviewFile,
  getFiles,
  getFilesByRecord,
  getFilesByInvoice,
  getFilesByFileName,
};

export default FileService;
