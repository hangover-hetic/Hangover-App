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

const buildFormBody = (details) => {
  // création du body de la requete post
  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
}

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

const postMercure = (data) => {
  const formBody = buildFormBody(data)

  // envoi de la requete avec l'url du hub mercure, la methode, le header avec le token d'envoi
  mercure.post('', formBody, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export { mercure, buildMercureUrl, listenMercureTopics, buildFormBody, postMercure };
