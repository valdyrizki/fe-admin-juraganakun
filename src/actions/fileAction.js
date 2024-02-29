import FileService from "../services/FileService";
import {
  CREATE_FILE_FAIL,
  CREATE_FILE_SUCCESS,
  DELETE_FILE_FAIL,
  DELETE_FILE_SUCCESS,
  GET_FILES_FAIL,
  GET_FILES_REQUEST,
  GET_FILES_SUCCESS,
  GET_FILE_FAIL,
  GET_FILE_REQUEST,
  GET_FILE_SUCCESS,
  UPDATE_FILE_FAIL,
  UPDATE_FILE_SUCCESS,
} from "./types";

export const getFiles = () => async (dispatch) => {
  dispatch({
    type: GET_FILES_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await FileService.getFiles(); //axios call API
    //dispatch success
    dispatch({
      type: GET_FILES_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_FILES_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getFilesByRecord = (record) => async (dispatch) => {
  dispatch({
    type: GET_FILES_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await FileService.getFilesByRecord(record); //axios call API
    //dispatch success
    dispatch({
      type: GET_FILES_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_FILES_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getPreviewFiles = (product_id, qty) => async (dispatch) => {
  dispatch({
    type: GET_FILES_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await FileService.getPreviewFile(product_id, qty); //axios call API
    //dispatch success
    dispatch({
      type: GET_FILES_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_FILES_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getFileById = (file_id) => async (dispatch) => {
  dispatch({
    type: GET_FILE_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await FileService.getFileById(file_id); //axios call API
    //dispatch success
    dispatch({
      type: GET_FILE_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_FILE_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const createFile = (formFile) => async (dispatch) => {
  dispatch({
    type: GET_FILE_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await FileService.createFile(formFile);
    //dispatch success
    dispatch({
      type: CREATE_FILE_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: CREATE_FILE_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const deleteFile = (id) => async (dispatch) => {
  dispatch({
    type: GET_FILE_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await FileService.deleteFile(id);
    //dispatch success
    dispatch({
      type: DELETE_FILE_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: DELETE_FILE_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const updateFile = (formFile) => async (dispatch) => {
  dispatch({
    type: GET_FILE_REQUEST,
    payload: {
      loading: true,
    },
  });
  try {
    const { data } = await FileService.updateFile(formFile);
    //dispatch success
    dispatch({
      type: UPDATE_FILE_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch ({ response }) {
    dispatch({
      type: UPDATE_FILE_FAIL,
      payload: {
        loading: false,
        data: response,
      },
    });
    return Promise.reject(response);
  }
};

export const getFileOptions = () => async (dispatch) => {
  dispatch({
    type: GET_FILES_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await FileService.getAll(); //axios call API
    // console.log("getFile");
    // console.log(data);
    const fileOptions = data.data.map((file) => ({
      id: file.id,
      value: file.name,
    }));

    //dispatch success
    dispatch({
      type: GET_FILES_SUCCESS,
      payload: {
        loading: false,
        data: fileOptions,
      },
    });

    return Promise.resolve(fileOptions);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_FILES_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getFilesByInvoice = (invoice) => async (dispatch) => {
  dispatch({
    type: GET_FILES_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await FileService.getFilesByInvoice(invoice); //axios call API
    //dispatch success
    dispatch({
      type: GET_FILES_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_FILES_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

export const getFilesByFileName = (filename) => async (dispatch) => {
  dispatch({
    type: GET_FILES_REQUEST,
    payload: {
      loading: true,
    },
  });

  try {
    const { data } = await FileService.getFilesByFileName(filename); //axios call API
    //dispatch success
    dispatch({
      type: GET_FILES_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });

    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_FILES_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};
