import { combineReducers } from "redux";
import userReducer         from "./User/userReducer";
import festivalReducer from "./Festival/festival-reducer";

const rootReducer = combineReducers(
    {
        userReducer,
        festivalReducer
    }
)

export default rootReducer;
