import axios from 'axios';
import config from './config';

const request = axios.create({
  baseURL: config.request.baseApiUrl,
  headers: config.request.globalHeaders,
});

export default request;
