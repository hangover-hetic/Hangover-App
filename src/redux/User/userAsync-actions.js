import {
  userLoadingLogin,
  userLoadingRegister,
  userToken,
  userLogingError,
  actualUser,
  mercureToken,
} from './userActions';
import request from '../../services/request';
import mercureRequest from '../../services/mercure-request';

export const postLogin = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(userLoadingLogin(true));
    try {
      const { data } = await request.post(`authentication_token`, {
        username: username,
        password: password,
      });

      dispatch(userToken(data.token));
      dispatch(mercureToken(data.mercureToken));
      dispatch(actualUser(data.user));
      dispatch(userLoadingLogin(false));

      request.defaults.headers['Authorization'] = `BEARER ${data.token}`;
      mercureRequest.defaults.headers['Authorization'] = `Bearer ${data.token}`;
    } catch (e) {
      let errorMessage = e?.response?.data;
      console.log(errorMessage);
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
