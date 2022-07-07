import axios from 'axios';
import config from './config';

const mercureRequest = axios.create({
  baseURL: config.request.baseMercureUrl,
  headers: config.request.globalHeaders,
});

export default mercureRequest;
