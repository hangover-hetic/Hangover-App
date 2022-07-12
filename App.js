import React from 'react';
import LoginConnected from './src/pages/Login';
import HomepageConnected from './src/pages/Homepage';
import FriendsConnected from './src/pages/Friends';
import FestivalConnected from './src/pages/Festival';
import Register from './src/pages/Register';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import Map from './src/pages/Map';
import { connect } from 'react-redux';
import { FeedNavigator } from './src/pages/Feed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import AccountConnected from './src/pages/Account';

const Tab = createBottomTabNavigator();

class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold': {
        uri: require('./assets/fonts/Poppins-SemiBold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Poppins-Bold': {
        uri: require('./assets/fonts/Poppins-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    const { userToken } = this.props;
    const windowWidth = Dimensions.get('window').width;
    const centerNavbarCalcul = (windowWidth - 300) / 2;

    // Use the font with the fontFamily property after loading
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaProvider>
          <StatusBar />
          <RootSiblingParent>
            <NavigationContainer style={{ backgroundColor: '#202020' }}>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  headerShown: false,
                  tabBarStyle: {
                    position: 'absolute',
                    left: centerNavbarCalcul,
                    justifyContent: 'center',
                    backgroundColor: '#3D3D3D',
                    height: 60,
                    width: 300,
                    marginBottom: 50,
                    borderRadius: 60,
                  },
                  // tabBarIcon: ({ focused, color, size }) => {
                  //   let iconName;
                  //
                  //   switch (route.name) {
                  //     case 'Feed':
                  //       iconName = 'albums';
                  //       break;
                  //     case 'Homepage':
                  //       iconName = 'home';
                  //       break;
                  //     case 'Map':
                  //       iconName = 'map';
                  //       break;
                  //     case 'Connexion':
                  //       iconName = 'person-outline';
                  //       break;
                  //     case 'Inscription':
                  //       iconName = 'person-add-outline';
                  //       break;
                  //   }
                  //
                  //   // You can return any component that you like here!
                  //   return <Ionicons name={iconName} size={size} color={color} />;
                  // },
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
                })}
              >
                {userToken !== null ? (
                  <>
                  <Tab.Screen
                      name='Festival'
                      component={FestivalConnected}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <MaterialIcons name="event" color={color} size={size} />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name='Account'
                      component={AccountConnected}
                    />
                    
                    <Tab.Screen
                      name="Friends"
                      component={FriendsConnected}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <MaterialIcons name="group" color={color} size={size} />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Feed"
                      component={FeedNavigator}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <MaterialIcons name="image" color={color} size={size} />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Homepage"
                      component={HomepageConnected}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <MaterialIcons name="home" color={color} size={size} />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Map"
                      component={Map}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <MaterialIcons name="map" color={color} size={size} />
                        ),
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Tab.Screen
                      name="Connexion"
                      component={LoginConnected}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="person" color={color} size={size} />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Inscription"
                      component={Register}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="person-add-outline" color={color} size={size} />
                        ),
                      }}
                    />
                  </>
                )}
              </Tab.Navigator>
            </NavigationContainer>
          </RootSiblingParent>
        </SafeAreaProvider>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  userToken: state.user.userToken,
});

const AppConnected = connect(mapStateToProps)(App);

export default AppConnected;
