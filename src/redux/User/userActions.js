import { 
    USER_TOKEN,
    USER_LOADING_LOGIN,
    USER_LOADING_REGISTER,
    USER_LOGIN_ERROR
} from "./userConstants";

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

export const userLoadingRegister = (loading) => {
    return {
        type   : USER_LOADING_REGISTER,
        payload: loading
    }
}

export const userLogingError = (error) => {
    return {
        type   : USER_LOGIN_ERROR,
        payload: error
    }
}
