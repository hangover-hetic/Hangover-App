import { USER_TOKEN } from "./userConstants";

export const userToken = (token) => {
    return {
        type   : USER_TOKEN,
        payload: token
    }
}
