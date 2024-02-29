import {
  GET_REPLICATES_REQUEST,
  GET_REPLICATES_SUCCESS,
  GET_REPLICATES_FAIL,
  GET_REPLICATE_REQUEST,
  GET_REPLICATE_SUCCESS,
  GET_REPLICATE_FAIL,
  CREATE_REPLICATE_SUCCESS,
  CREATE_REPLICATE_FAIL,
  UPDATE_REPLICATE_SUCCESS,
  UPDATE_REPLICATE_FAIL,
  DELETE_REPLICATE_SUCCESS,
  DELETE_REPLICATE_FAIL,
} from "../actions/types";

const initialState = {
  getReplicatesResult: false,
  getReplicatesError: false,
  getReplicatesLoading: false,
  getReplicateResult: false,
  getReplicateError: false,
  getReplicateLoading: false,
};

const replicate = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPLICATES_REQUEST:
      return {
        ...state,
        getReplicatesResult: false,
        getReplicatesError: false,
        getReplicatesLoading: action.payload.loading,
      };
    case GET_REPLICATES_SUCCESS:
      return {
        ...state,
        getReplicatesResult: action.payload.data,
        getReplicatesError: false,
        getReplicatesLoading: action.payload.loading,
      };
    case GET_REPLICATES_FAIL:
      return {
        ...state,
        getReplicatesResult: false,
        getReplicatesError: action.payload.data,
        getReplicatesLoading: action.payload.loading,
      };
    case GET_REPLICATE_REQUEST:
      return {
        ...state,
        getReplicateResult: false,
        getReplicateError: false,
        getReplicateLoading: action.payload.loading,
      };
    case GET_REPLICATE_SUCCESS:
      return {
        ...state,
        getReplicateResult: action.payload.data,
        getReplicateError: false,
        getReplicateLoading: action.payload.loading,
      };
    case GET_REPLICATE_FAIL:
      return {
        ...state,
        getReplicateResult: false,
        getReplicateError: action.payload.data,
        getReplicateLoading: action.payload.loading,
      };
    case CREATE_REPLICATE_SUCCESS:
      return {
        ...state,
        getReplicateResult: action.payload.data,
        getReplicateError: false,
        getReplicateLoading: action.payload.loading,
      };
    case CREATE_REPLICATE_FAIL:
      return {
        ...state,
        getReplicateResult: false,
        getReplicateError: action.payload.data,
        getReplicateLoading: action.payload.loading,
      };
    case UPDATE_REPLICATE_SUCCESS:
      return {
        ...state,
        getReplicateResult: action.payload.data,
        getReplicateError: false,
        getReplicateLoading: action.payload.loading,
      };
    case UPDATE_REPLICATE_FAIL:
      return {
        ...state,
        getReplicateResult: false,
        getReplicateError: action.payload.data,
        getReplicateLoading: action.payload.loading,
      };
    case DELETE_REPLICATE_SUCCESS:
      return {
        ...state,
        getReplicateResult: action.payload.data,
        getReplicateError: false,
        getReplicateLoading: action.payload.loading,
      };
    case DELETE_REPLICATE_FAIL:
      return {
        ...state,
        getReplicateResult: false,
        getReplicateError: action.payload.data,
        getReplicateLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default replicate;
