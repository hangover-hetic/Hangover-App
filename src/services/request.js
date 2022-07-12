import axios from 'axios';
import config from './config';
import Toast from 'react-native-root-toast';

const request = axios.create({
  baseURL: config.request.baseApiUrl,
  headers: config.request.globalHeaders,
});

request.interceptors.response.use(function (response) {
  //console.log(response.status, response.data);
  return response;
}, function (error) {
  Toast.show("Erreur : " + error.response.status + " - " + error?.response?.data?.detail  )
  return Promise.reject(error);
});

export default request;
