import DashboardService from "../services/DashboardService";
import { GET_DASHBOARD_FAIL, GET_DASHBOARD_SUCCESS } from "./types";

export const getDashboard = () => async (dispatch) => {
  dispatch({
    type: GET_DASHBOARD_SUCCESS,
    payload: {
      loading: true,
    },
  });

  const { data } = await DashboardService.getAll(); //axios call API
  try {
    //dispatch success
    dispatch({
      type: GET_DASHBOARD_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_DASHBOARD_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};
