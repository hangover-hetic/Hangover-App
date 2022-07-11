import mapConfig from './mapConfig.json';

export default {
  request: {
    baseURL: `https://hangover.timotheedurand.fr/`,
    baseApiUrl: `https://hangover.timotheedurand.fr/api`,
    baseMercureUrl: `https://hangover-hub.timotheedurand.fr/.well-known/mercure`,
    globalHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  fallbackProfilePicture:
    'https://us.123rf.com/450wm/mialima/mialima1603/mialima160300025/55096766-ic%C3%B4ne-d-utilisateur-homme-isol%C3%A9-sur-un-fond-blanc-compte-avatar-pour-le-web-utilisateur-photo-de-pro.jpg?ver=6',
  mapConfig,
};
