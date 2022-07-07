import rootReducer from "./rootReducer";
import thunk       from "redux-thunk";
import { 
    legacy_createStore as createStore, 
    applyMiddleware,
    compose
}                  from 'redux'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)),
   
);


export default reduxStore;
