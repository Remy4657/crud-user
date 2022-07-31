import * as actionTypes from "./type";

export const FETCH_DATA_LOGIN = () => {
  return {
    type: actionTypes.FETCH_DATA_LOGIN,
  };
};
export const FETCH_DATA_SUCCESS = (email, token) => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    email: email,
    token: token,
  };
};
export const FETCH_DATA_ERROR = () => {
  return {
    type: actionTypes.FETCH_DATA_ERROR,
  };
};
export const LOGOUT = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
