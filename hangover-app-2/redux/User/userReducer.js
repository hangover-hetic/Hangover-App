import { USER_TOKEN,
        USER_LOADING_LOGIN,
        USER_LOADING_REGISTER
} from "./userConstants";

const initialState = {
    userToken           : "",
    userLoadingLogin    : false,
    userLoadingRegister : false
};

const userReducer = (state = initialState, action) => {
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
        default:
        return state;
    }
}

export default userReducer;
