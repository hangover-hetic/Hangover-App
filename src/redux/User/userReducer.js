import {
  USER_TOKEN,
  USER_LOADING_LOGIN,
  USER_LOADING_REGISTER,
  USER_LOGIN_ERROR,
} from './userConstants';

const INITIAL_STATE = {
    userToken           : "",
    userError           : "",
    userLoadingLogin    : false,
    userLoadingRegister : false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_TOKEN:
            return {
                ...state,
                userToken: action.payload
            };
        case USER_LOADING_LOGIN:
            return {
                ...state,
                userLoadingLogin: action.payload
            };
        case USER_LOADING_REGISTER:
            return {
                ...state,
                userLoadingRegister: action.payload
            };
        case USER_LOGIN_ERROR:
            return {
                ...state,
                userError: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;
