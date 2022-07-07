import { 
    SET_ACTUAL_FESTIVAL, 
    SET_ACTUAL_FESTIVAL_POSTS 
} from './festival-constants';

export const setActualFestival = (payload) => {
    return {
        type: SET_ACTUAL_FESTIVAL,
        payload,
    };
};
export const setActualFestivalPosts = (payload) => {
    return {
        type: SET_ACTUAL_FESTIVAL_POSTS,
        payload,
    };
};
