import { setActualFestival, setActualFestivalPosts, getFestival } from './festival-actions';
import request from '../../services/request';
import dayjs from '../../services/dayjs';

export const fetchFestival = (id, isActual = true) => {
  return async (dispatch) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: `festivals/${id}`,
      });
      if(isActual){
        dispatch(setActualFestival(data));
      } else if(!isActual) {
        dispatch(getFestival(data));
      }
      
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
      data = data.sort((a, b) => {
        if (dayjs(a.createdAt).isAfter(b.createdAt)) return 1;
        if (dayjs(a.createdAt).isBefore(b.createdAt)) return -1;
        return 0;
      });
      dispatch(setActualFestivalPosts(data));
    } catch (e) {
      console.dir(e);
    }
  };
};
