import React from 'react';
import { Image, StyleSheet, Text, Vibration } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import RNEventSource from 'react-native-event-source';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import request from '../services/request';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { buildFormBody, listenMercureTopics, mercure, postMercure } from '../services/mercure';
import Container from '../components/ui/Container';
import Paragraph from '../components/semantics/Paragraph';
import { getAbsoluteMediaPath, getProfilePicture } from '../services/media';
import config from '../services/config';

const TASK_NAME = 'BACKGROUND_LOC';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Aucune donnée',
      location: null,
      errorMsg: null,
      friendsLocations: {},
      friends: [],
    };
  }

  async componentDidMount() {
    try {
      const { currentUser, mercureToken } = this.props;
      const { data: friendships } = await request.get(`friendships/user/${currentUser.id}`);

      TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
        if (error) {
          Toast.show('Erreur : ' + error.message);
          return;
        }
        if (data) {
          // Extract location coordinates from data
          const { locations } = data;

          const location = locations[0];

          if (location) {
            this.setLocation(location);
          }
        }
      });
      const topics = [];
      const friends = [];
      for (let friend of friendships) {
        topics.push(`https://hangoverapp.fr/loc/api/friend/user/${friend.id}`);
        friends.push({
          id: friend.id,
          firstname: friend.firstName,
          lastname: friend.lastName,
          profilePicture: getProfilePicture(friend.profilePicture),
        });
      }
      topics.push(`https://hangoverapp.fr/loc/api/friend/user/${currentUser.id}`);

      this.setState({
        friends,
      });

      listenMercureTopics(topics, mercureToken, this.onFriendLocalisationReceive.bind(this));
      await this.initMap(currentUser);
    } catch (e) {
      Toast.show(`Error: ${e.response.data}`);
    }
  }

  setLocation(location) {
    this.setState({
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  }

  onFriendLocalisationReceive(response) {
    const { currentUser } = this.props;
    const userData = JSON.parse(response.data).message.user;
    if (JSON.parse(response.data).message.ask) {
      this.sendMyLocation(currentUser);
      return;
    }
    const location = JSON.parse(response.data).message.location;
    const { friendsLocations } = this.state;
    if (!friendsLocations[userData.id]) {
      Toast.show(`Votre ami ${userData.firstName} ${userData.lastName} vient de se connecter`);
      Vibration.vibrate();
    }
    friendsLocations[userData.id] = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      latitude: location.lat,
      longitude: location.long,
      profilePicture: getProfilePicture(userData.profilePicture),
    };
    this.setState({ friendsLocations });
  }

  async sendMyLocation(currentUser) {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        this.setState({ errorMsg: 'Permission to access location was denied' });
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      this.createMessagePosition(location, currentUser);
      this.setLocation(location);
      return location;
    } catch (e) {
      Toast.show(e);
      console.log(e);
    }


  }

  async initMap() {
    const { currentUser } = this.props;

    try {
      console.log('here');
      await this.sendMyLocation(currentUser);

      this.getAllFriendLocation(currentUser);
      /* this.createMessagePosition(location, currentUser);
          this.setState({location: location.coords.latitude + ' ' + location.coords.longitude}); */

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
    } catch (e) {
      Toast.show('Erreur' + e);
      console.log(e);
    }
  }

  getAllFriendLocation(currentUser) {
    postMercure({
      topic: 'https://hangoverapp.fr/loc/api/friend/user/' + currentUser.id,
      data: JSON.stringify({
        message: {
          user: currentUser,
          ask: 'Give me your location',
        },
      }),
    });
  }

  // création du message à publish
  createMessagePosition(position) {
    const { currentUser } = this.props;
    postMercure({
      topic: 'https://hangoverapp.fr/loc/api/friend/user/' + currentUser.id,
      data: JSON.stringify({
        message: {
          user: currentUser,
          location: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
        },
      }),
    });
  }

  ghostMode(currentUser) {
    postMercure({
      topic: 'https://hangoverapp.fr/loc/api/friend/user/' + currentUser.id,
      data: JSON.stringify({
        message: {
          user: currentUser,
          ask: 'Ghost',
        },
      }),
    });
  }

  render() {
    const { location, friendsLocations } = this.state;
    return (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: location?.latitude ? location.latitude : 0,
          longitude: location?.longitude ? location.longitude : 0,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}
        showsMyLocationButton
        minZoomLevel={10}
        maxZoomLevel={20}
        customMapStyle={config.mapConfig}
      >
        {
          Object.keys(friendsLocations).map((key) => {
              const { latitude, longitude, profilePicture } = friendsLocations[key];
              return (
                <Marker coordinate={{ latitude, longitude }} key={'friends-marker-' + key}>
                  <Image source={{ uri: profilePicture }} style={{ width: 30, height: 30, borderRadius: 50 }} />
                </Marker>
              );
            },
          )
        }
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.actualUser,
  mercureToken: state.userReducer.mercureToken,
});
export default connect(mapStateToProps)(Map);
