import request from '../../../settings/request';
import {setActualFestival, setActualFestivalPosts} from "./festival-actions";

export const fetchFestival = (id) => {
    return async dispatch => {
        try {
            const {data} = await request({
                method: "GET",
                url: `festivals/${id}`
            });
            dispatch(setActualFestival(data))
        } catch (e) {
            console.dir(e);
        }
    };
};

export const fetchFestivalPosts = (id) => {
    return async dispatch => {
        try {
            const {data} = await request({
                method: "GET",
                url: `festivals/${id}/posts`
            });
            dispatch(setActualFestivalPosts(data))
        } catch (e) {
            console.dir(e);
        }
    };
};


