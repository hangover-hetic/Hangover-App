import {
  USER_TOKEN,
  USER_LOADING_LOGIN,
  USER_LOADING_REGISTER,
  USER_LOGIN_ERROR,
  ACTUAL_USER,
  MERCURE_TOKEN,
} from './userConstants';

const initialState = {
  userToken: null,
  mercureToken: null,
  userError: '',
  userLoadingLogin: true,
  userLoadingRegister: true,
  actualUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case MERCURE_TOKEN:
      return {
        ...state,
        mercureToken: action.payload,
      };
    case ACTUAL_USER:
      return {
        ...state,
        actualUser: action.payload,
      };
    case USER_LOADING_LOGIN:
      return {
        ...state,
        userLoadingLogin: action.payload,
      };
    case USER_LOADING_REGISTER:
      return {
        ...state,
        userLoadingRegister: action.payload,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        userError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
