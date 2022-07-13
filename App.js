import React from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as TaskManager from 'expo-task-manager';
import Toast from 'react-native-root-toast';
import store from './src/redux/store';
import { userLocation } from './src/redux/User/userActions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginRegisterNavigator } from './src/pages/LoginRegister';
import MainNavigator from './src/pages/Main/MainNavigator';
import { TASK_NAME } from './src/pages/Main/Map';

const Stack = createNativeStackNavigator();

export const LOGIN_REGISTER_ROUTE = "LoginRegister"
export const MAIN_ROUTE = "Main"

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

    // Use the font with the fontFamily property after loading
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaProvider>
          <StatusBar />
          <RootSiblingParent>
            <NavigationContainer style={{ backgroundColor: '#202020' }}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                {userToken !== null ? (
                  <Stack.Screen
                    name={MAIN_ROUTE}
                    component={MainNavigator}
                  />
                ) : (
                  <Stack.Screen
                    name={LOGIN_REGISTER_ROUTE}
                    component={LoginRegisterNavigator}
                  />
                )}
              </Stack.Navigator>

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
      store.dispatch(userLocation(location));
    }
  }
});

export default AppConnected;


