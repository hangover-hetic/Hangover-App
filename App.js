import React from 'react';
import LoginConnected from './src/pages/Login';
import HomepageConnected from './src/pages/Homepage';
import FriendsConnected from './src/pages/Friends';
import Register from './src/pages/Register';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './src/pages/Map';
import { connect } from 'react-redux';
import Feed from './src/pages/Feed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
    const Stack = createNativeStackNavigator();

    // Use the font with the fontFamily property after loading
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
            >
              {userToken !== null ? (
                <>
                <Stack.Screen
                    name='FriendsConnected'
                    component={FriendsConnected}

                  />
                  
                  <Stack.Screen
                    name='HomepageConnected'
                    component={HomepageConnected}

                  />
                  
                  <Stack.Screen
                    name='Feed'
                    component={Feed}
                  />

                  <Stack.Screen
                    name='Map'
                    component={Map}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name='LoginConnected'
                    component={LoginConnected}

                  />
                  <Stack.Screen
                    name='Register'
                    component={Register}

                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>

      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userReducer.userToken,
});

const AppConnected = connect(mapStateToProps)(App);

export default AppConnected;
