import {
  USER_TOKEN,
  USER_LOADING_LOGIN,
  USER_LOADING_REGISTER,
  USER_LOGIN_ERROR,
  ACTUAL_USER,
  USER_FRIENDS,
  USER_INSCRIPTION_FRIENDS,
  USER_INSCRIPTION,
  MERCURE_TOKEN,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_ERROR,
  USER_REGISTER_SUCCESS, 
  USER_LOCATION,
  USER_UPDATE_USER

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
export const userInscription = (error) => {
  return {
    type: USER_INSCRIPTION,
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

export const userLoginError = (error) => {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
  };
};

export const userLoginSuccess = (success) => {
  return {
    type: USER_REGISTER_ERROR,
    payload: success,
  };
};

export const userRegisterError = (error) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: error,
  };
};

export const userRegisterSuccess = (success) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: success,
  };
};

export const userLocation = (location) => {
  return {
    type: USER_LOCATION,
    payload: location
  }
}

export const userUpdateError = (error) => {
  return {
    type: USER_UPDATE_USER,
    payload: error
  }
}

