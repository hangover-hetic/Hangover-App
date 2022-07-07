import {
  USER_TOKEN,
  USER_LOADING_LOGIN,
  USER_LOADING_REGISTER,
  USER_LOGIN_ERROR,
  USER_FRIENDS,
  ACTUAL_USER,
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
export const userFriends = (error) => {
  return {
    type: USER_FRIENDS,
    payload: error,
  };
};
