import config from './config';
import request from './request';
import mime from 'mime';

export const getAbsoluteMediaPath = (media) => {
  return config.request.baseURL + media;
};

export const uploadMedia = (file) => {
  const newImageUri = 'file:///' + file.uri.split('file:/').join('');
  let formData = new FormData();
  formData.append('file', {
    uri: newImageUri,
    type: mime.getType(newImageUri),
    name: newImageUri.split('/').pop(),
  });
  return request.post('media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getMediaIri = (mediaId) => {
  return '/api/media/' + mediaId;
};

export const getProfilePicture = (profilePicture) => {
  return profilePicture?.contentUrl
    ? getAbsoluteMediaPath(profilePicture.contentUrl)
    : config.fallbackProfilePicture;
};
