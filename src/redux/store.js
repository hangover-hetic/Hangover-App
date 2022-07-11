import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(
  persistReducer(persistConfig, rootReducer),
  composeEnhancer(applyMiddleware(thunk))
);

export default reduxStore;
