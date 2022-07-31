import * as actionTypes from "../actions/type";

const INITIAL_STATE = {
  account: {
    email: "",
    auth: false,
    token: "",
  },
  isLoading: false,
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        account: {
          email: action.email,
          auth: true,
          token: action.token,
        },
        isLoading: false,
        isError: false,
      };
    case actionTypes.FETCH_DATA_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return {
        ...state,
        account: {
          auth: false,
          token: "",
          email: "",
        },
      };
    default:
      return state;
  }
};

export default userReducer;
