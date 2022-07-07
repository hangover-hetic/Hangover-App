import config from './config';

export const getAbsoluteMediaPath = (media) => {
  return config.request.baseURL + media
}