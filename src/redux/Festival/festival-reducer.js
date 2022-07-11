import { ADD_ACTUAL_FESTIVAL_POSTS, SET_ACTUAL_FESTIVAL, SET_ACTUAL_FESTIVAL_POSTS, SET_FESTIVAL, SET_FESTIVALS } from './festival-constants';

const initialState = {
  actualFestival: null,
  actualFeed: [],
  festival: null,
  festivals: []
};

const festivalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTUAL_FESTIVAL:
      return {
        ...state,
        actualFestival: action.payload,
      };
    case SET_FESTIVAL:
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
        actualFeed: [action.payload, ...state.actualFeed],
      };
    case SET_FESTIVALS:
      return {
        ...state,
        festivals: action.payload
      }
    default:
      return state;
  }
};

export default festivalReducer;
