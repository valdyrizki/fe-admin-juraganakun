import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../actions/types";

const initialState = {
  getUsersResult: false,
  getUsersError: false,
  getUsersLoading: false,
  getUserResult: false,
  getUserError: false,
  getUserLoading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        getUsersResult: false,
        getUsersError: false,
        getUsersLoading: action.payload.loading,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        getUsersResult: action.payload.data,
        getUsersError: false,
        getUsersLoading: action.payload.loading,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        getUsersResult: false,
        getUsersError: action.payload.data,
        getUsersLoading: action.payload.loading,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        getUserResult: false,
        getUserError: false,
        getUserLoading: action.payload.loading,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        getUserResult: action.payload.data,
        getUserError: false,
        getUserLoading: action.payload.loading,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        getUserResult: false,
        getUserError: action.payload.data,
        getUserLoading: action.payload.loading,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        getUserResult: action.payload.data,
        getUserError: false,
        getUserLoading: action.payload.loading,
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        getUserResult: false,
        getUserError: action.payload.data,
        getUserLoading: action.payload.loading,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        getUserResult: action.payload.data,
        getUserError: false,
        getUserLoading: action.payload.loading,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        getUserResult: false,
        getUserError: action.payload.data,
        getUserLoading: action.payload.loading,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        getUserResult: action.payload.data,
        getUserError: false,
        getUserLoading: action.payload.loading,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        getUserResult: false,
        getUserError: action.payload.data,
        getUserLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default user;
