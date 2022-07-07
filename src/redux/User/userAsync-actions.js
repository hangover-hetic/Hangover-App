import request from '../../../settings/request';
import { userLoadingLogin, userLoadingRegister, userToken, userLogingError } from './userActions';
import mercureRequest from '../../../settings/mercure-request';

export const postLogin = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(userLoadingLogin(true));
    try {
      const tokenAccess = await request.post(`authentication_token`, {
        username: data.username,
        password: data.password,
      });
      dispatch(userToken(tokenAccess.datatoken));
      dispatch(userLoadingLogin(false));
      request.defaults.headers['Authorization'] = `BEARER ${data.token}`;
      mercureRequest.defaults.headers['Authorization'] = `Bearer ${data.token}`;
    } catch (e) {
      let errorMessage = e?.response?.data;
      dispatch(userLogingError(errorMessage));
    }
  };
};

export const postRegister = (data) => {
  return async (dispatch) => {
    dispatch(userLoadingRegister(true));
    try {
      await request.post(`users`, {
        userName: data.userName,
        password: data.password,
        email: data.email,
        phone: data.phone,
        address: data.address,
        country: data.country,
      });
    } catch (e) {
      console.dir(e);
    } finally {
      dispatch(userLoadingRegister(false));
    }
  };
};
