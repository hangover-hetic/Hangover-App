import {SET_ACTUAL_FESTIVAL, SET_ACTUAL_FESTIVAL_POSTS} from "./festival-constants";

const initialState = {
    actualFestival : null,
    actualFeed : []
};

const festivalReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ACTUAL_FESTIVAL:
            return {
                ...state,
                actualFestival: action.payload
            };
        case SET_ACTUAL_FESTIVAL_POSTS:
            return {
                ...state,
                actualFeed: action.payload
            };
        default:
        return state;
    }
}

export default festivalReducer;
