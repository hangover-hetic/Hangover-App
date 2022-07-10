import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
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
import { getAbsoluteMediaPath } from '../services/media';

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

      for (let friend of friendships) {
        topics.push(`https://hangoverapp.fr/loc/api/friend/user/${friend.id}`);
        this.state.friends.push({
          id: friend.id,
          firstname: friend.firstName,
          lastname: friend.lastName,
          profilePicture:
            'https://us.123rf.com/450wm/mialima/mialima1603/mialima160300025/55096766-ic%C3%B4ne-d-utilisateur-homme-isol%C3%A9-sur-un-fond-blanc-compte-avatar-pour-le-web-utilisateur-photo-de-pro.jpg?ver=6',
        });
      }
      topics.push(`https://hangoverapp.fr/loc/api/friend/user/${currentUser.id}`);

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
    friendsLocations[userData.id] = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      latitude: location.lat,
      longitude: location.long,
    };
    this.setState({ friendsLocations });
  }

  async sendMyLocation(currentUser) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ errorMsg: 'Permission to access location was denied' });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.createMessagePosition(location, currentUser);
    this.setLocation(location);
    return location;
  }

  async initMap() {
    const { currentUser } = this.props;

    try {
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
    const { currentUser } = this.props;
    const { location,friendsLocations } = this.state;

    console.log(friendsLocations);
    const userMarker = currentUser?.profilePicture?.contentUrl ? getAbsoluteMediaPath(currentUser.profilePicture.contentUrl) : 'https://us.123rf.com/450wm/mialima/mialima1603/mialima160300025/55096766-ic%C3%B4ne-d-utilisateur-homme-isol%C3%A9-sur-un-fond-blanc-compte-avatar-pour-le-web-utilisateur-photo-de-pro.jpg?ver=6';

    return (
      <Container>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: location?.latitude ? location.latitude : 0,
            longitude: location?.longitude ? location.longitude : 0,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}
          followsUserLocation
          showsMyLocationButton
          minZoomLevel={16}
          maxZoomLevel={20}
        >
          {location?.latitude && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            >
              <Image source={{ uri: userMarker }} style={{ width: 30, height: 30, borderRadius: 50 }} />
            </Marker>
          )}
        </MapView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '70%',
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.actualUser,
  mercureToken: state.userReducer.mercureToken,
});
export default connect(mapStateToProps)(Map);
