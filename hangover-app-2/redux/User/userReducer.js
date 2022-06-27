import { USER_TOKEN } from "./userConstants";

const initialState = {
    userToken: ""
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_TOKEN:
        return {
            ...state,
            userToken: action.payload
        };
        default:
        return state;
    }
}

export default { userReducer };