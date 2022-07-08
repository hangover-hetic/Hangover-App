import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import axios from 'axios';
import RNEventSource from 'react-native-event-source';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { client, TASK_NAME, baseUrl } from '../api/client';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Aucune donnée',
      location: null,
      errorMsg: null,
      locations: {},
      friends: [],
    };
  }

  async componentDidMount() {
    let url = baseUrl.concat('.well-known/mercure');

    try {
      const response = await client.get(`users/6`);
      const currentUser = response.data;
      const friendships = await (await client.get(`friendships/user/6`)).data;

      TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        if (data) {
          // Extract location coordinates from data
          const { locations } = data;

          const location = locations[0];

          if (location) {
            // this.createMessagePosition(location, currentUser);
            this.setState({ location: location.coords.latitude + ' ' + location.coords.longitude });
          }
        }
      });

      for (let friend of friendships) {
        if (friendships.indexOf(friend) === 0) {
          url = url.concat('?', `topic=https://hangoverapp.fr/loc/api/friend/user/${friend.id}`);
        } else {
          url = url.concat('&', `topic=https://hangoverapp.fr/loc/api/friend/user/${friend.id}`);
        }
        this.state.friends.push({
          id: friend.id,
          firstname: friend.firstName,
          lastname: friend.lastName,
          profilePicture:
            'https://us.123rf.com/450wm/mialima/mialima1603/mialima160300025/55096766-ic%C3%B4ne-d-utilisateur-homme-isol%C3%A9-sur-un-fond-blanc-compte-avatar-pour-le-web-utilisateur-photo-de-pro.jpg?ver=6',
        });

        /* url.searchParams.append('topic', `https://hangoverapp.fr/loc${friends}`); */
      }
      console.log(this.state.friends);
      url = url.concat('&', `topic=https://hangoverapp.fr/loc/api/friend/user/${currentUser.id}`);

      /*  url.searchParams.append('topic', 'https://hangoverapp.fr/loc/api/friendships/12'); */

      await this.listenTopics(url, currentUser);
      await this.initMap(currentUser);
    } catch (e) {
      console.error(`Error: ${e.response.data}`);
    }
  }

  async sendMyLocation(currentUser) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ errorMsg: 'Permission to access location was denied' });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.createMessagePosition(location, currentUser);
    this.setState({ location: location.coords.latitude + ' ' + location.coords.longitude });
    return location;
  }

  async initMap(currentUser) {
    await this.sendMyLocation(currentUser);

    this.getAllFriendLocation(currentUser);
    /* this.createMessagePosition(location, currentUser);
        this.setState({location: location.coords.latitude + ' ' + location.coords.longitude}); */
    const TASK_NAME = 'LOCATION_TASK_NAME';

    await Location.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Location',
        notificationBody: 'Location tracking in background',
        notificationColor: '#ffffff',
      },
      deferredUpdatesDistance: 5,
    });
  }

  getAllFriendLocation(currentUser) {
    let details = {
      topic: 'https://hangoverapp.fr/loc/api/friend/user/' + currentUser.id,
      data: JSON.stringify({
        message: {
          user: currentUser,
          ask: 'Give me your location',
        },
      }),
    };

    // création du body de la requete post
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    // envoi de la requete avec l'url du hub mercure, la methode, le header avec le token d'envoi (celui-ci marche avec tous les topics) et le content-type (important) etenfin le body avec l'objet précédent
    fetch('https://hangover-hub.timotheedurand.fr/.well-known/mercure', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdLCJwYXlsb2FkIjp7InVzZXIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2R1bmdsYXMiLCJyZW1vdGVBZGRyIjoiMTI3LjAuMC4xIn19fQ.iYRYJoHNXmfpzg9DnTSBc6fAbddMKUPRpdvtsLAq-pI',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });
  }

  async listenTopics(url, currentUser) {
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdLCJwYXlsb2FkIjp7InVzZXIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2R1bmdsYXMiLCJyZW1vdGVBZGRyIjoiMTI3LjAuMC4xIn19fQ.iYRYJoHNXmfpzg9DnTSBc6fAbddMKUPRpdvtsLAq-pI',
      },
    };
    const eventSource = new RNEventSource(url, options);

    eventSource.addEventListener('message', (data) => {
      const userData = JSON.parse(data.data).message.user;
      if (JSON.parse(data.data).message.ask) {
        this.sendMyLocation(currentUser);
        return;
      }
      const location = JSON.parse(data.data).message.location;
      const { locations } = this.state;
      locations[userData.id] =
        userData.firstName +
        ' ' +
        userData.lastName +
        ' : lat -> ' +
        location.lat +
        ' , long -> ' +
        location.long;
      this.setState({ locations });
    });
  }

  ghostMode(currentUser) {
    let details = {
      topic: 'https://hangoverapp.fr/loc/api/friend/user/' + currentUser.id,
      data: JSON.stringify({
        message: {
          user: currentUser,
          ask: 'Ghost',
        },
      }),
    };

    // création du body de la requete post
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    // envoi de la requete avec l'url du hub mercure, la methode, le header avec le token d'envoi (celui-ci marche avec tous les topics) et le content-type (important) etenfin le body avec l'objet précédent
    fetch('https://hangover-hub.timotheedurand.fr/.well-known/mercure', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdLCJwYXlsb2FkIjp7InVzZXIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2R1bmdsYXMiLCJyZW1vdGVBZGRyIjoiMTI3LjAuMC4xIn19fQ.iYRYJoHNXmfpzg9DnTSBc6fAbddMKUPRpdvtsLAq-pI',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });
  }

  render() {
    return (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 48.8625588,
          longitude: 2.4423232,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}
      >
        <Marker coordinate={{ latitude: 48.8625588, longitude: 2.4423232 }} title={'ezeze'} />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});
export default Map;
