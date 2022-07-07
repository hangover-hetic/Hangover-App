import request from '../../../settings/request';
import {
    userLoadingLogin,
    userLoadingRegister,
    userToken,
    userLogingError
}              from './userActions';

export const postLogin = (data) => {
    return async dispatch => {
            console.log(dispatch(userLoadingLogin(true)));
        try {
           const tokenAccess =  await request.post(
                `authentication_token`,
                {
                    username: data.username,
                    password: data.password,
                },
            );
            dispatch(userToken(tokenAccess.data.token))
            dispatch(userLoadingLogin(true));
        } catch (e) {
           let errorMessage = e?.response?.data;
           console.log(e)
           dispatch(userLogingError(errorMessage))
           dispatch(userLoadingLogin(true));
        }
    };
};

export const postRegister = (data) => {
    return async dispatch => {
        dispatch(userLoadingRegister(true));
        try {
            await request.post(
                `users`,
                {
                    userName: data.userName,
                    password: data.password,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    country: data.country,
                },
            );
        } catch (e) {
            console.dir(e);
        } finally {
            dispatch(userLoadingRegister(false));
        }
    };
};
