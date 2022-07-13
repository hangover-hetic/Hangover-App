import {
  ADD_ACTUAL_FESTIVAL_POSTS,
  SET_ACTUAL_FESTIVAL,
  SET_ACTUAL_FESTIVAL_POSTS,
  SET_FESTIVAL,
  SET_FESTIVALS,
} from './festival-constants';

export const setActualFestival = (payload) => {
  return {
    type: SET_ACTUAL_FESTIVAL,
    payload,
  };
};
export const setFestival = (payload) => {
  return {
    type: SET_FESTIVAL,
    payload,
  };
};
export const setActualFestivalPosts = (payload) => {
  return {
    type: SET_ACTUAL_FESTIVAL_POSTS,
    payload,
  };
};
export const addActualFestivalPosts = (payload) => {
  return {
    type: ADD_ACTUAL_FESTIVAL_POSTS,
    payload,
  };
};

export const setFestivals = (payload) => {
  return {
    type: SET_FESTIVALS,
    payload,
  };
};
