import RoleService from "../services/RoleService";
import { GET_ROLES_FAIL, GET_ROLES_REQUEST, GET_ROLES_SUCCESS } from "./types";

export const getRoles = () => async (dispatch) => {
  dispatch({
    type: GET_ROLES_REQUEST,
    payload: {
      loading: true,
    },
  });

  const { data } = await RoleService.get(); //axios call API
  try {
    //dispatch success
    dispatch({
      type: GET_ROLES_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.resolve(data);
  } catch (data) {
    //dispatch fail
    dispatch({
      type: GET_ROLES_FAIL,
      payload: {
        loading: false,
        data: data,
      },
    });
    return Promise.reject(data);
  }
};

// export const getUserById = (user_id) => async (dispatch) => {
//   dispatch({
//     type: GET_USER_REQUEST,
//     payload: {
//       loading: true,
//     },
//   });

//   const { data } = await UserService.getUserById(user_id); //axios call API
//   try {
//     //dispatch success
//     dispatch({
//       type: GET_USER_SUCCESS,
//       payload: {
//         loading: false,
//         data: data,
//       },
//     });
//     return Promise.resolve(data);
//   } catch (data) {
//     //dispatch fail
//     dispatch({
//       type: GET_USER_FAIL,
//       payload: {
//         loading: false,
//         data: data,
//       },
//     });
//     return Promise.reject(data);
//   }
// };

// export const createUser = (formUser) => async (dispatch) => {
//   try {
//     const { data } = await UserService.createUser(formUser);
//     console.log(data);
//     //dispatch success
//     dispatch({
//       type: CREATE_USER_SUCCESS,
//       payload: {
//         loading: false,
//         data: data,
//       },
//     });

//     return Promise.resolve(data);
//   } catch ({ response }) {
//     dispatch({
//       type: CREATE_USER_FAIL,
//       payload: {
//         loading: false,
//         data: response,
//       },
//     });
//     return Promise.reject(response);
//   }
// };

// export const deleteUser = (id) => async (dispatch) => {
//   try {
//     const { data } = await UserService.deleteUser(id);
//     console.log(data);
//     //dispatch success
//     dispatch({
//       type: DELETE_USER_SUCCESS,
//       payload: {
//         loading: false,
//         data: data,
//       },
//     });

//     return Promise.resolve(data);
//   } catch ({ response }) {
//     dispatch({
//       type: DELETE_USER_FAIL,
//       payload: {
//         loading: false,
//         data: response,
//       },
//     });
//     return Promise.reject(response);
//   }
// };

// export const updateUser = (formUser) => async (dispatch) => {
//   try {
//     const { data } = await UserService.updateUser(formUser);
//     console.log(data);
//     //dispatch success
//     dispatch({
//       type: UPDATE_USER_SUCCESS,
//       payload: {
//         loading: false,
//         data: data,
//       },
//     });

//     return Promise.resolve(data);
//   } catch ({ response }) {
//     dispatch({
//       type: UPDATE_USER_FAIL,
//       payload: {
//         loading: false,
//         data: response,
//       },
//     });
//     return Promise.reject(response);
//   }
// };
