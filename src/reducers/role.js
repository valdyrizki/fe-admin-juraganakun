import {
  GET_ROLES_FAIL,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
} from "../actions/types";

const initialState = {
  getRolesResult: false,
  getRolesError: false,
  getRolesLoading: false,
  getRoleResult: false,
  getRoleError: false,
  getRoleLoading: false,
};

const role = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES_REQUEST:
      return {
        ...state,
        getRolesResult: false,
        getRolesError: false,
        getRolesLoading: action.payload.loading,
      };
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        getRolesResult: action.payload.data.data,
        getRolesError: false,
        getRolesLoading: action.payload.loading,
      };
    case GET_ROLES_FAIL:
      return {
        ...state,
        getRolesResult: false,
        getRolesError: action.payload.data,
        getRolesLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default role;
