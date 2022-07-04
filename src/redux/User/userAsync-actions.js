import request from '../../../settings/request';
import {userLoadingLogin, userLoadingRegister,} from './userActions';

export const postLogin = (data) => {
    return async dispatch => {
        dispatch(userLoadingLogin(true));
        try {
            await request.post(
                `authentication_token`,
                {
                    username: data.username,
                    password: data.password,
                },
            );
        } catch (e) {
            console.dir(e);
        } finally {
            dispatch(userLoadingLogin(false));
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
