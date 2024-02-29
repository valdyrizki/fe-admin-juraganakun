import { GET_DASHBOARD_SUCCESS, GET_DASHBOARD_FAIL } from "../actions/types";

const initialState = {
  getDashboardResult: false,
  getDashboardError: false,
  getDashboardLoading: false,
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        getDashboardResult: action.payload.data,
        getDashboardError: false,
        getDashboardLoading: action.payload.loading,
      };
    case GET_DASHBOARD_FAIL:
      return {
        ...state,
        getDashboardResult: false,
        getDashboardError: action.payload.data,
        getDashboardLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default dashboard;
