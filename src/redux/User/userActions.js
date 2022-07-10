import {
  USER_TOKEN,
  USER_LOADING_LOGIN,
  USER_LOADING_REGISTER,
  USER_LOGIN_ERROR,
  ACTUAL_USER,
  USER_FRIENDS,
  USER_INSCRIPTION_FRIENDS,
  MERCURE_TOKEN,
} from './userConstants';

export const userToken = (token) => {
  return {
    type: USER_TOKEN,
    payload: token,
  };
};

export const mercureToken = (token) => {
  return {
    type: MERCURE_TOKEN,
    payload: token,
  };
};

export const actualUser = (user) => {
  return {
    type: ACTUAL_USER,
    payload: user,
  };
};

export const userFriends = (error) => {
  return {
    type: USER_FRIENDS,
    payload: error,
  };
};
export const userInscriptionFriends = (error) => {
  return {
    type: USER_INSCRIPTION_FRIENDS,
    payload: error,
  };
};

export const userLoadingLogin = (loading) => {
  return {
    type: USER_LOADING_LOGIN,
    payload: loading,
  };
};

export const userLoadingRegister = (loading) => {
  return {
    type: USER_LOADING_REGISTER,
    payload: loading,
  };
};

export const userLogingError = (error) => {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
  };
};
