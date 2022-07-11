import {
  userLoadingLogin,
  userLoadingRegister,
  userToken,
  userLogingError,
  actualUser,
  userFriends,
  userInscriptionFriends,
  userInscription,
  mercureToken,
} from './userActions';
import request from '../../services/request';
import { mercure } from '../../services/mercure';

export const postLogin = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(userLoadingLogin(true));
    try {
      const { data } = await request.post(`authentication_token`, {
        username: username,
        password: password,
      });

      request.defaults.headers['Authorization'] = `BEARER ${data.token}`;
      mercure.defaults.headers['Authorization'] = `Bearer ${data.mercureToken}`;

      dispatch(userToken(data.token));
      dispatch(mercureToken(data.mercureToken));
      dispatch(actualUser(data.user));
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
export const deleteFriend = (id) => {
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
