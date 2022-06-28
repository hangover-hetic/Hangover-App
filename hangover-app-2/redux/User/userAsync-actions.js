import request              from "../../settings/request";
import { userLoadingLogin } from "./userActions";

export const postLogin = ( data ) => {
    return async dispatch => {
        dispatch(userLoadingLogin(true))

        try {
            await request.post(
                `authentification_token`,
                {
                    userName: data.userName,
                    password: data.password
                }
            )
        } catch(e) {
            console.dir(e)
        } finally {
            dispatch(userLoadingLogin(false))
        }
    }
}
