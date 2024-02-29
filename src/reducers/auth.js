import {
  DO_LOGOUT,
  POST_LOGIN_FAIL,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
} from "../actions/types";

const initialState = {
  getAuthResult: false,
  getAuthError: false,
  getAuthLoading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return {
        ...state,
        getAuthResult: false,
        getAuthError: false,
        getAuthLoading: action.payload.loading,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        getAuthResult: action.payload.data,
        getAuthError: false,
        getAuthLoading: action.payload.loading,
      };
    case POST_LOGIN_FAIL:
      return {
        ...state,
        getAuthResult: false,
        getAuthError: action.payload.data,
        getAuthLoading: action.payload.loading,
      };
    case DO_LOGOUT:
      return {
        ...state,
        getAuthResult: false,
        getAuthError: false,
        getAuthLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
