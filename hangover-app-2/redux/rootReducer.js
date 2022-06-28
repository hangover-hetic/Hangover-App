import { combineReducers } from "redux";
import userReducer         from "./User/userReducer";

const rootReducer = combineReducers(
    {
        userReducer
    }
)

export default rootReducer;
