import axios from 'axios';
import config from './config';
import RNEventSource from 'react-native-event-source';

const mercure = axios.create({
  baseURL: config.request.baseMercureUrl,
  headers: config.request.globalHeaders,
});

const buildMercureUrl = (baseUrl, topics) => {
  let result = baseUrl;
  for (let topic of topics) {
    if (topics.indexOf(topic) === 0) {
      result = result + '?topic=' + topic;
    } else {
      result = result + '&topic=' + topic;
    }
  }
  return result;
};

const listenMercureTopics = (topics, token, callback) => {
  const url = buildMercureUrl(config.request.baseMercureUrl, topics);
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const eventSource = new RNEventSource(url, options);
  eventSource.addEventListener('message', callback);
};

export { mercure, buildMercureUrl, listenMercureTopics };
