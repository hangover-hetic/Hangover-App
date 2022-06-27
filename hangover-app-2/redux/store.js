import rootReducer        from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const reducer = {
    reducerRoot : rootReducer
}

const reduxStore = configureStore ({ reducer });

export default reduxStore;
