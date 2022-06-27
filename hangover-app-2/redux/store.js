import { 
combineReducers,
configureStore 
}                  from "redux";
import userReducer from "./User/userReducer";

const rootReducer = combineReducers (

{userToken : userReducer }

);

const createStore = () => {

return configureStore(rootReducer);

}

export default { createStore };