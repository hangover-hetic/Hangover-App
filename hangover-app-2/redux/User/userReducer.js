import { USER_TOKEN }         from "./userConstants";
import { USER_LOADING_LOGIN } from "./userConstants";

const initialState = {
    userToken       : "",
    userLoadingLogin: false,
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
        default:
        return state;
    }
}

export default userReducer;
