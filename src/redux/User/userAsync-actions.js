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
  userRegisterSuccess,
  usersSearchEmail,
} from './userActions';
import request from '../../services/request';
import { mercure } from '../../services/mercure';
import Toast from 'react-native-root-toast';

export const postLogin = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`authentication_token`, {
        username: username,
        password: password,
      });

      console.log({ data });
      request.defaults.headers['Authorization'] = `BEARER ${data.token}`;
      mercure.defaults.headers['Authorization'] = `Bearer ${data.mercureToken}`;

      dispatch(actualUser(data.user));
      dispatch(userToken(data.token));
      dispatch(mercureToken(data.mercureToken));
      dispatch(userLoginSuccess(true));
      dispatch(userLoadingLogin(false));
    } catch (e) {
      Toast.show('Erreur : ' + e?.response?.data?.message);
      console.log(e.response.data.message);
      dispatch(userLoginError(true));
    }
  };
};

export const postRegister = ({ firstName, lastName, password, email }) => {
  return async (dispatch) => {
    try {
      console.log('ci', firstName);
      console.log(dispatch);
      const { data } = await request.post(`users`, {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
      });
      Toast.show(`L'utilisateur ${data.firstName}  ${data.lastName} a bien été crée`);
    } catch (e) {
      Toast.show('Erreur inscription : ' + e.response.data.detail);
      console.log(e.response.data.detail);
      dispatch(userRegisterError(true));
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
export const searchUsersByEmail = (val) => {
  return async (dispatch) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: `users?email=${val}`,
      });
      return data;
    } catch (e) {
      console.dir(e);
    }
  };
};
export const deleteFriend = (id) => {
  return async (dispatch) => {
    try {
      await request({
        method: 'DELETE',
        url: `friendships/${id}`,
      });
    } catch (e) {
      console.dir(e);
    }
  };
};
export const acceptFriend = (id) => {
  return async (dispatch) => {
    try {
      await request.put(`friendships/${id}`, {
        validated: true,
      });
    } catch (e) {
      console.dir(e);
    }
  };
};
export const createInvitation = (friendId, actualUserId) => {
  return async (dispatch) => {
    try {
      await request.post(`friendships`, {
        friend: `/api/users/${friendId}`,
        relatedUser: `/api/users/${actualUserId}`,
      });
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
export const deleteInscriptionFestival = (id) => {
  return async (dispatch) => {
    try {
      await request({
        method: 'DELETE',
        url: `inscriptions/${id}`,
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
