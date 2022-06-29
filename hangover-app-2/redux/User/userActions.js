import { USER_TOKEN }         from "./userConstants";
import { USER_LOADING_LOGIN } from "./userConstants";

export const userToken = (token) => {
    return {
        type   : USER_TOKEN,
        payload: token
    }
}

export const userLoadingLogin = (loading) => {
    return {
        type   : USER_LOADING_LOGIN,
        payload: loading
    }
}
