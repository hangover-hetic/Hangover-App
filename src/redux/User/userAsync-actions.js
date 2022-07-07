import request from '../../../settings/request';
import {
    userLoadingLogin,
    userLoadingRegister,
    userToken,
    userLogingError
}              from './userActions';

export const postLogin = (data) => {
    return async dispatch => {
            dispatch(userLoadingLogin(true));
        try {
           const tokenAccess =  await request.post(
                `authentication_token`,
                {
                    username: data.username,
                    password: data.password,
                },
            );
            dispatch(userToken(tokenAccess.datatoken))
            dispatch(userLoadingLogin(false));
        } catch (e) {
           let errorMessage = e?.response?.data;
           dispatch(userLogingError(errorMessage))
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
