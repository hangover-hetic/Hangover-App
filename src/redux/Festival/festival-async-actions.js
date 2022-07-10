import { setActualFestival, setActualFestivalPosts } from './festival-actions';
import request from '../../services/request';
import dayjs from '../../services/dayjs';

export const fetchFestival = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: `festivals/${id}`,
      });
      dispatch(setActualFestival(data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchFestivalPosts = (id) => {
  return async (dispatch) => {
    try {
      let { data } = await request({
        method: 'GET',
        url: `festivals/${id}/posts`,
      });
      dispatch(setActualFestivalPosts(data));
    } catch (e) {
      console.dir(e);
    }
  };
};
