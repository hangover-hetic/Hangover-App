import {
  USER_TOKEN,
  USER_LOADING_LOGIN,
  USER_LOADING_REGISTER,
  USER_LOGIN_ERROR,
  ACTUAL_USER,
  USER_FRIENDS,
  USER_INSCRIPTION,
  USER_INSCRIPTION_FRIENDS,
  MERCURE_TOKEN,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_ERROR,
  USER_REGISTER_SUCCESS,
  USERS_SEARCH_EMAIL,
  USER_LOCATION,
} from './userConstants';

const initialState = {
  userToken: null,
  mercureToken: null,
  userLoginError: false,
  userLoadingLogin: true,
  userLoadingRegister: true,
  actualUser: null,
  userLoginSuccess: false,
  userRegisterError: false,
  useRegisterSuccess: false,
  userInscription: [],
  userInscriptionFriends: [],
  userUpdateError: false,

  userLocation: {
    latitude: 0,
    longitude: 0,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case MERCURE_TOKEN:
      return {
        ...state,
        mercureToken: action.payload,
      };
    case ACTUAL_USER:
      return {
        ...state,
        actualUser: action.payload,
      };
    case USER_FRIENDS:
      return {
        ...state,
        userFriends: action.payload,
      };
    case USERS_SEARCH_EMAIL:
      return {
        ...state,
        usersSearchEmail: action.payload,
      };
    case USER_INSCRIPTION:
      console.log('paylo', action.payload);
      return {
        ...state,
        userInscription: action.payload,
      };
    case USER_INSCRIPTION_FRIENDS:
      return {
        ...state,
        userInscriptionFriends: action.payload,
      };
    case USER_LOADING_LOGIN:
      return {
        ...state,
        userLoadingLogin: action.payload,
      };
    case USER_LOADING_REGISTER:
      return {
        ...state,
        userLoadingRegister: action.payload,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        userLoginError: action.payload,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginSuccess: action.payload,
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        userRegisterError: action.payload,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userRegisterSuccess: action.payload,
      };
    case USER_LOCATION:
      return {
        ...state,
        userLocation: {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.longitude,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
