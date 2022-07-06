import React from 'react';
import LoginConnected from './src/pages/Login';
import HomepageConnected from './src/pages/Homepage';
import Register from './src/pages/Register';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './src/pages/Map';

export default class App extends React.Component {
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
        this.setState({fontsLoaded: true});
    }

    componentDidMount() {
        this.loadFonts();
    }

    render() {
        const Stack = createNativeStackNavigator();
        // Use the font with the fontFamily property after loading
        if (this.state.fontsLoaded) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="LoginConnected">
                        <Stack.Screen 
                            name="LoginConnected" 
                            component={LoginConnected} 
                            options={{
                                title : "Login",
                                headerStyle: {
                                    backgroundColor : '#202020'
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight : 'bold'
                                }
                            }}
                        />
                        <Stack.Screen 
                            name="Register" 
                            component={Register} 
                            options={{
                                title : "Register",
                                headerStyle: {
                                    backgroundColor : '#202020'
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight : 'bold'
                                }
                            }}
                        />
                        <Stack.Screen 
                            name="HomepageConnected" 
                            component={HomepageConnected} 
                            options={{
                                headerShown: false,
                                headerStyle: {
                                    backgroundColor : '#202020'
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight : 'bold'
                                }
                            }}
                        />
                        <Stack.Screen 
                            name="Map" 
                            component={Map} 
                            options={{
                                title : "Map",
                                headerStyle: {
                                    backgroundColor : '#202020'
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight : 'bold'
                                }
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        } else {
            return null;
        }
    }
}
