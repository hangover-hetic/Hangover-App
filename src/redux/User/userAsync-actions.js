import {
  userLoadingLogin,
  userLoadingRegister,
  userToken,
  actualUser,
  userFriends,
  userInscriptionFriends,
  userInscription,
  mercureToken,
  userLoginSuccess,
  userLoginError,
  userRegisterError,
  userRegisterSuccess
} from './userActions';
import request from '../../services/request';
import { mercure } from '../../services/mercure';
import Toast from 'react-native-root-toast';

export const postLogin = ({ username, password }) => {
  return async dispatch => {
    dispatch(userLoadingLogin(true));
    dispatch(userLoginSuccess(false))
    try {
      const { data } = await request.post(`authentication_token`, {
        username: username,
        password: password,
      });

      request.defaults.headers['Authorization'] = `BEARER ${data.token}`;
      mercure.defaults.headers['Authorization'] = `Bearer ${data.mercureToken}`;

      dispatch(actualUser(data.user));
      dispatch(userToken(data.token));
      dispatch(mercureToken(data.mercureToken));

      dispatch(userLoginSuccess(true))

      dispatch(userLoadingLogin(false));
    } catch (e) {
      dispatch(userLoginError(true))
    }
  };
};

export const postRegister = ({ data }) => {
  return async dispatch => {
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
      dispatch(userRegisterError(true))
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

export const fetchInscriptionFriends = () => {
  return async (dispatch) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: 'inscriptions/friends',
      });

      dispatch(userInscriptionFriends(data));
    } catch (e) {
      console.dir(e);
    }
  };
};

export const postInscriptionFestival = (idFestival, idUser) => {
  return async (dispatch) => {
    try {
      await request.post(`inscriptions`, {
        festival: `/api/festivals/${idFestival}`,
        relatedUser: `/api/users/${idUser}`,
      });
    } catch (e) {
      console.dir(e);
    }
  };
};
export const fetchInscriptionFestival = () => {
  return async (dispatch) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: 'inscriptions',
      });

      dispatch(userInscription(data));
    } catch (e) {
      console.dir(e);
    }
  };
};

export const setGhostMode = (id, value) => {
  return async (dispatch) => {
    try {
      const { data } = await request.put(`users/${id}`, {
        ghostMode: value,
      });
      dispatch(actualUser(data));
    } catch (e) {
      Toast.show('Erreur requete :' + e);
    }
  };
};
