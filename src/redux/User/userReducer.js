import {
  USER_TOKEN,
  USER_LOADING_LOGIN,
  USER_LOADING_REGISTER,
  USER_LOGIN_ERROR,
} from './userConstants';

const initialState = {
  userToken: '',
  userError: '',
  userLoadingLogin: true,
  userLoadingRegister: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
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
