import { ADD_ACTUAL_FESTIVAL_POSTS, SET_ACTUAL_FESTIVAL, SET_ACTUAL_FESTIVAL_POSTS, GET_FESTIVAL } from './festival-constants';

const initialState = {
  actualFestival: null,
  actualFeed: [],
  festival: null
};

const festivalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTUAL_FESTIVAL:
      return {
        ...state,
        actualFestival: action.payload,
      };
    case GET_FESTIVAL:
      return {
        ...state,
        festival: action.payload,
      };
    case SET_ACTUAL_FESTIVAL_POSTS:
      return {
        ...state,
        actualFeed: action.payload,
      };
    case ADD_ACTUAL_FESTIVAL_POSTS:
      return {
        ...state,
        actualFeed:  [...state.actualFeed, action.payload],
      };
    default:
      return state;
  }
};

export default festivalReducer;
