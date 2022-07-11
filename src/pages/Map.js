import { Component, createRef } from 'react';
import { Image, Pressable, StyleSheet, Vibration, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import request from '../services/request';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { listenMercure, postMercure } from '../services/mercure';
import { getProfilePicture } from '../services/media';
import config from '../services/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setGhostMode } from '../redux/User/userAsync-actions';

const TASK_NAME = 'BACKGROUND_LOC';
const ASK_LOCATION = 'SEND_LOCATION';
const ASK_ACTIVATE_GHOST = 'MAKE_ME_DISAPPEAR';
const ASK_ALERT = 'HELP';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: null,
      markers: {},
      friends: [],
      showMap: false,
    };
    const { currentUser } = this.props;
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
          this.setMarker(currentUser, location, true);
        }
      }
    });

    this.mapViewRef = createRef();
  }

  componentDidMount() {
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        Toast.show('Permission to access location was denied');
        return;
      }
      this.setState({
        showMap: true,
      });
    });

    this.initAll().catch((e) => {
      console.log('Erreur init', e);
    });
  }

  async initAll() {
    try {
      const { currentUser, mercureToken } = this.props;
      const { data: friendships } = await request.get(`friendships/user/${currentUser.id}`);

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
      listenMercure(topics, mercureToken, this.onFriendLocalisationReceive.bind(this));

      await this.initMap(currentUser);
    } catch (e) {
      Toast.show(`Error: ${e.response.data}`);
    }
  }

  setMarker(user, location, isUser) {
    const { markers } = this.state;
    const { latitude, longitude } = this.getNormalizedLatitude(location);
    markers[user.id] = {
      markerKey: 'friend-marker-' + user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: getProfilePicture(user.profilePicture),
      latitude,
      longitude,
    };
    this.setState({ markers });

    if (isUser)
      this.setState({
        location: {
          latitude,
          longitude,
        },
      });
  }

  deleteMarker(user) {
    const { markers } = this.state;
    console.log('delete', markers[user.id]);
    delete markers[user.id];
    this.setState({
      markers,
    });
  }

  getNormalizedLatitude(location) {
    return {
      latitude: location.coords ? location.coords.latitude : location.latitude,
      longitude: location.coords ? location.coords.longitude : location.longitude,
    };
  }

  onFriendLocalisationReceive(response) {
    const { currentUser } = this.props;
    const { message } = JSON.parse(response.data);
    const userData = message.user;
    console.log('message', message);
    if (message.ask) {
      // if (userData.id === currentUser.id) return;
      switch (message.ask) {
        case ASK_LOCATION:
          this.sendMyLocation(currentUser);
          return;
          break;
        case ASK_ACTIVATE_GHOST:
          console.log('hey');
          this.deleteMarker(userData);
          return;
          break;
        case ASK_ALERT:
          Toast.show(`Votre ami ${userData.firstName} ${userData.lastName} à un problème`);
          Vibration.vibrate();
        default:
          break;
      }
    }
    const { markers } = this.state;
    const location = message.location;
    if (!markers[userData.id] && userData.id !== currentUser.id) {
      Toast.show(`Votre ami ${userData.firstName} ${userData.lastName} vient de se connecter`);
      Vibration.vibrate();
    }
    this.setMarker(userData, location);
  }

  async sendMyLocation() {
    try {
      if (this.props.currentUser.ghostMode) return;
      let location = await Location.getCurrentPositionAsync({});
      this.createMessagePosition(location);
    } catch (e) {
      Toast.show(e);
      console.log('erreur', e);
    }
  }

  async initMap() {
    const { currentUser } = this.props;

    try {
      this.setMarker(currentUser, await Location.getCurrentPositionAsync({}), true);

      this.getAllFriendLocation(currentUser);
      await this.sendMyLocation(currentUser);

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
      console.log('Erreur' + e);
    }
  }

  postUserTopics(message) {
    try {
      postMercure({
        topic: 'https://hangoverapp.fr/loc/api/friend/user/' + this.props.currentUser.id,
        data: JSON.stringify({
          message,
        }),
      });
    } catch (e) {
      Toast.show('Erreur :' + e);
    }
  }

  getAllFriendLocation() {
    const { currentUser } = this.props;
    this.postUserTopics({
      user: currentUser,
      ask: ASK_LOCATION,
    });
  }

  // création du message à publish
  createMessagePosition(location) {
    const { currentUser } = this.props;
    this.postUserTopics({
      user: currentUser,
      location: this.getNormalizedLatitude(location),
    });
  }

  activateGhostMode() {
    const { currentUser } = this.props;
    this.postUserTopics({
      user: currentUser,
      ask: ASK_ACTIVATE_GHOST,
    });
  }

  onPressGhostMode() {
    const { currentUser, dispatch } = this.props;

    if (currentUser.ghostMode) {
      dispatch(setGhostMode(currentUser.id, false));
      this.sendMyLocation().catch((e) => Toast.show('Erreur' + e));
      Toast.show('Vous êtes bien réapparus sur les cartes de vos amis');
      return;
    }

    dispatch(setGhostMode(currentUser.id, true));
    this.activateGhostMode();
    Toast.show('Vous êtes bien disparus sur les cartes de vos amis');
  }

  onPressAlert() {
    const { currentUser } = this.props;
    this.postUserTopics({
      user: currentUser,
      ask: ASK_ALERT,
      location: this.getNormalizedLatitude(this.state.location),
    });
  }

  render() {
    const { location, markers, showMap } = this.state;
    const { currentUser } = this.props;
    return (
      <View>
        {showMap && (
          <MapView
            ref={this.mapViewRef}
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
            {Object.keys(markers).map((key) => {
              const { latitude, longitude, profilePicture, markerKey } = markers[key];
              return (
                <Marker coordinate={{ latitude, longitude }} key={markerKey}>
                  <Image
                    source={{ uri: profilePicture }}
                    style={{ width: 30, height: 30, borderRadius: 50 }}
                  />
                </Marker>
              );
            })}
          </MapView>
        )}
        {currentUser && (
          <>
            <Pressable
              style={[
                styles.ghostButton,
                { backgroundColor: currentUser.ghostMode ? 'green' : 'grey' },
              ]}
              onPress={this.onPressGhostMode.bind(this)}
            >
              <MaterialCommunityIcons name="ghost" size={30} color="white" />
            </Pressable>
            <Pressable
              style={[styles.ghostButton, { top: 70, backgroundColor: 'orange' }]}
              onPress={this.onPressAlert.bind(this)}
            >
              <Ionicons name="alert" size={30} color="white" />
            </Pressable>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  ghostButton: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.actualUser,
  mercureToken: state.userReducer.mercureToken,
});
export default connect(mapStateToProps)(Map);
