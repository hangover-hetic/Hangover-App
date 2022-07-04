import React from 'react';
import Container from './src/components/ui/Container';
import Login from './src/pages/Login';
import HomepageConnected from './src/pages/Homepage';
import Register from './src/pages/Register';
import NotFound from './src/pages/NotFound';
import {NativeRouter, Route, Routes,} from 'react-router-native';
import {useFonts} from 'expo-font';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={Login} options={{title : "Login"}}/>
                        <Stack.Screen name="Register" component={Register} options={{title : "Register"}}/>
                        <Stack.Screen name="HomepageConnected" component={HomepageConnected} options={{title : "Homepage"}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            );
        } else {
            return null;
        }
    }
}
