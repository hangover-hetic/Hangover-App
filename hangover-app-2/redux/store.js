import rootReducer        from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { legacy_createStore as createStore} from 'redux'

const reduxStore = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default reduxStore;
