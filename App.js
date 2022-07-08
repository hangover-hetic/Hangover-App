import React from 'react';
import LoginConnected from './src/pages/Login';
import HomepageConnected from './src/pages/Homepage';
import Register from './src/pages/Register';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './src/pages/Map';
import { connect } from 'react-redux';
import Feed from './src/pages/Feed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

    // Use the font with the fontFamily property after loading
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaProvider>
          <StatusBar/>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown : false,
                tabBarStyle:{
                  position : 'absolute',
                  left: 30,
                  backgroundColor:'#3D3D3D',
                  height:60,
                  width: 300,
                  alignSelf: "center",
                  marginBottom: 30,
                  flexDirection: "row",
                  borderRadius: 40,
                },
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                switch(route.name) {
                  case "Connexion" : 
                    iconName = "person";
                    break;
                  case "Inscription" : 
                    iconName = "person-add";
                    break;
                  case "Feed" : 
                    iconName = "albums";
                    break;
                  case "Homepage" : 
                    iconName = "home";
                    break;
                  case "Map" : 
                    iconName = "map";
                    break;
                }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
            >
              {userToken !== null ? (
                <>
                  <Tab.Screen
                    name='Feed'
                    component={Feed}
                  />
                  <Tab.Screen
                    name="Homepage"
                    component={HomepageConnected}
                  />
                  <Tab.Screen
                    name='Map'
                    component={Map}
                  />
                </>
              ) : (
                <>
                  <Tab.Screen
                    name='Connexion'
                    component={LoginConnected}
                  />
                  <Tab.Screen
                    name='Inscription'
                    component={Register}
                  />
                </>
              )}
            </Tab.Navigator>
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
