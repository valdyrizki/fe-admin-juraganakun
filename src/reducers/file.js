import {
  GET_FILES_REQUEST,
  GET_FILES_SUCCESS,
  GET_FILES_FAIL,
  GET_FILE_REQUEST,
  GET_FILE_SUCCESS,
  GET_FILE_FAIL,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_FAIL,
  UPDATE_FILE_SUCCESS,
  UPDATE_FILE_FAIL,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAIL,
} from "../actions/types";

const initialState = {
  getFilesResult: false,
  getFilesError: false,
  getFilesLoading: false,
  getFileResult: false,
  getFileError: false,
  getFileLoading: false,
};

const file = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILES_REQUEST:
      return {
        ...state,
        getFilesResult: false,
        getFilesError: false,
        getFilesLoading: action.payload.loading,
      };
    case GET_FILES_SUCCESS:
      return {
        ...state,
        getFilesResult: action.payload.data,
        getFilesError: false,
        getFilesLoading: action.payload.loading,
      };
    case GET_FILES_FAIL:
      return {
        ...state,
        getFilesResult: false,
        getFilesError: action.payload.data,
        getFilesLoading: action.payload.loading,
      };
    case GET_FILE_REQUEST:
      return {
        ...state,
        getFileResult: false,
        getFileError: false,
        getFileLoading: action.payload.loading,
      };
    case GET_FILE_SUCCESS:
      return {
        ...state,
        getFileResult: action.payload.data,
        getFileError: false,
        getFileLoading: action.payload.loading,
      };
    case GET_FILE_FAIL:
      return {
        ...state,
        getFileResult: false,
        getFileError: action.payload.data,
        getFileLoading: action.payload.loading,
      };
    case CREATE_FILE_SUCCESS:
      return {
        ...state,
        getFileResult: action.payload.data,
        getFileError: false,
        getFileLoading: action.payload.loading,
      };
    case CREATE_FILE_FAIL:
      return {
        ...state,
        getFileResult: false,
        getFileError: action.payload.data,
        getFileLoading: action.payload.loading,
      };
    case UPDATE_FILE_SUCCESS:
      return {
        ...state,
        getFileResult: action.payload.data,
        getFileError: false,
        getFileLoading: action.payload.loading,
      };
    case UPDATE_FILE_FAIL:
      return {
        ...state,
        getFileResult: false,
        getFileError: action.payload.data,
        getFileLoading: action.payload.loading,
      };
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        getFileResult: action.payload.data,
        getFileError: false,
        getFileLoading: action.payload.loading,
      };
    case DELETE_FILE_FAIL:
      return {
        ...state,
        getFileResult: false,
        getFileError: action.payload.data,
        getFileLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default file;
