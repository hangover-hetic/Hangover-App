import { Component, createRef } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Vibration, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import request from '~/services/request';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { listenMercure, postMercure } from '~/services/mercure';
import { getProfilePicture } from '~/services/media';
import config from '~/services/config';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setGhostMode } from '~/redux/User/userAsync-actions';
import Paragraph from '~/components/semantics/Paragraph';
import LoadingIndicator from '../../components/ui/LoadingIndicator';

export const TASK_NAME = 'BACKGROUND_LOC';
const ASK_LOCATION = 'SEND_LOCATION';
const ASK_ACTIVATE_GHOST = 'MAKE_ME_DISAPPEAR';
const ASK_ALERT = 'HELP';

class Map extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: null,
      markers: {},
      friends: [],
      showMap: false,
    };

    this.mapViewRef = createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        Toast.show('Permission to access location was denied');
        return;
      }
      if (this._isMounted) {
        this.setState({
          showMap: true,
        });
      }
    });

    this.initAll().catch((e) => {
      console.log('Erreur init', e);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { location: newLocation, currentUser } = this.props;
    if (
      prevProps.location.latitude !== newLocation.latitude ||
      prevProps.location.longitude !== newLocation.longitude
    ) {
      this.setMarker(currentUser, newLocation, true);
      this.createMessagePosition(newLocation);
    }
  }

  async initAll() {
    try {
      if (!this._isMounted) return;
      const { currentUser, mercureToken } = this.props;
      const { data: friendships } = await request.get(`friendships/user/${currentUser.id}`);
      const topics = [];
      const friends = [];
      for (let friend of friendships) {
        if (friend.validated) {
          topics.push(`https://hangoverapp.fr/loc/api/friend/user/${friend.user.id}`);
          friends.push({
            id: friend.user.id,
            firstname: friend.user.firstName,
            lastname: friend.user.lastName,
            profilePicture: getProfilePicture(friend.user.profilePicture),
          });
        }
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

  setMarker(user, location) {
    const markers = { ...this.state.markers };
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
  }

  getFriendById(id) {
    const user = this.state.friends[id];
    if (!user) {
      console.error(`User ${id} is not one of your friends`);
      return null;
    }
    return user;
  }

  deleteMarker(user) {
    const { markers } = this.state;
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
    if (!this._isMounted) return;
    const { currentUser } = this.props;
    const { message } = JSON.parse(response.data);
    const { location, user: userId, ask } = message;
    let user;
    if (userId !== currentUser.id) {
      user = this.getFriendById(userId);
      if (!user) return;
      if (!this.state.markers[user.id]) {
        this.onFriendsNewConnection(user);
      }

      if (ask) {
        let needReturn = false;
        switch (ask) {
          case ASK_LOCATION:
            this.sendMyLocation(currentUser);
            needReturn = true;
            break;
          case ASK_ACTIVATE_GHOST:
            this.deleteMarker(user.id);
            needReturn = true;
            break;
          case ASK_ALERT:
            this.onFriendAlert(user);
            break;
        }
        if (needReturn) {
          return;
        }
      }
    } else {
      user = currentUser;
    }

    if (location) this.setMarker(user, location);
  }

  onFriendAlert(friend) {
    Toast.show(`Votre ami ${friend?.firstName} ${friend?.lastName} a un problème`);
    Vibration.vibrate();
  }

  onFriendsNewConnection(friend) {
    Toast.show(`Votre ami ${friend?.firstName} ${friend?.lastName} vient de se connecter`);
    Vibration.vibrate();
  }

  async sendMyLocation(force) {
    try {
      if (this.props.currentUser.ghostMode && !force) return;
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
        deferredUpdatesInterval: 1000,
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
      user: currentUser.id,
      ask: ASK_LOCATION,
    });
  }

  // création du message à publish
  createMessagePosition(location) {
    const { currentUser } = this.props;
    this.postUserTopics({
      user: currentUser.id,
      location: this.getNormalizedLatitude(location),
    });
  }

  activateGhostMode() {
    const { currentUser } = this.props;
    this.postUserTopics({
      user: currentUser.id,
      ask: ASK_ACTIVATE_GHOST,
    });
  }

  onPressGhostMode() {
    const { currentUser, dispatch } = this.props;

    if (currentUser.ghostMode) {
      dispatch(setGhostMode(currentUser.id, false));
      this.sendMyLocation(true).catch((e) => Toast.show('Erreur' + e));
      Toast.show('Vous êtes bien réapparus sur les cartes de vos amis');
      return;
    }

    dispatch(setGhostMode(currentUser.id, true));
    this.activateGhostMode();
    Toast.show('Vous êtes bien disparus sur les cartes de vos amis');
  }

  onPressAlert() {
    const { currentUser, location } = this.props;
    this.postUserTopics({
      user: currentUser.id,
      ask: ASK_ALERT,
      location: this.getNormalizedLatitude(location),
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { markers, showMap } = this.state;
    const { currentUser, location } = this.props;
    return (
      <View>
        {showMap && location.latitude !== 0 ? (
          <SafeAreaView>
            <MapView
              ref={this.mapViewRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: location?.latitude ? location.latitude : 0,
                longitude: location?.longitude ? location.longitude : 0,
                latitudeDelta: 0.09,
                longitudeDelta: 0.035,
              }}
              minZoomLevel={10}
              maxZoomLevel={20}
              customMapStyle={config.mapConfig}
            >
              {Object.keys(markers).map((key) => {
                const { latitude, longitude, profilePicture, firstName, lastName, markerKey } =
                  markers[key];
                return (
                  <Marker coordinate={{ latitude, longitude }} key={markerKey}>
                    <View style={{ alignItems: 'center' }}>
                      <Paragraph
                        content={`${firstName} ${lastName}`}
                        styles={{ marginBottom: 5 }}
                      />
                      <Image
                        source={{ uri: profilePicture }}
                        style={{ width: 30, height: 30, borderRadius: 50 }}
                      />
                    </View>
                  </Marker>
                );
              })}
            </MapView>
          </SafeAreaView>
        ) : (
          <LoadingIndicator />
        )}

        {currentUser && (
          <Pressable
            style={[
              styles.ghostButton,
              { backgroundColor: currentUser.ghostMode ? 'green' : 'grey', top: 70 },
            ]}
            onPress={this.onPressGhostMode.bind(this)}
          >
            <MaterialCommunityIcons name="ghost" size={30} color="white" />
          </Pressable>
        )}

        {currentUser && location.latitude !== 0 && (
          <Pressable
            style={[styles.ghostButton, { top: 140, backgroundColor: 'orange' }]}
            onPress={this.onPressAlert.bind(this)}
          >
            <Ionicons name="alert" size={30} color="white" />
          </Pressable>
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
  currentUser: state.user.actualUser,
  mercureToken: state.user.mercureToken,
  location: state.user.userLocation,
});

const MapConnected = connect(mapStateToProps)(Map);

export default MapConnected;
