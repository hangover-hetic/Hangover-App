import request from '../../services/request';
import { userLoadingLogin, userLoadingRegister, userToken, userLogingError, userFriends, actualUser } from './userActions';
import mercureRequest from '../../services/mercure-request';

export const postLogin = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(userLoadingLogin(true));
    try {
      const { data } = await request.post(`authentication_token`, {
        username: username,
        password: password,
      });
      console.log(data);
      dispatch(userToken(data.token));
      dispatch(actualUser(data.user));
      request.defaults.headers['Authorization'] = `BEARER ${data.token}`;
      mercureRequest.defaults.headers['Authorization'] = `Bearer ${data.token}`;
      dispatch(userLoadingLogin(false));
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

export const fetchFriends = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: `friendships/user/${id}`,
      });
      dispatch(userFriends(data));
    } catch (e) {
      console.dir(e);
    }
  };
};
