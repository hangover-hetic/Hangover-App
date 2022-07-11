import { combineReducers } from 'redux';
import userReducer from './User/userReducer';
import festivalReducer from './Festival/festival-reducer';

const rootReducer = combineReducers({
  user : userReducer,
  festival : festivalReducer,
});

export default rootReducer;
