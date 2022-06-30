import React from 'react';
import Container from './src/components/Container';
import Login from './src/pages/Login';
import HomepageConnected from './src/pages/Homepage';
import Register from './src/pages/Register';
import NotFound from './src/pages/NotFound';
import {NativeRouter, Route, Routes,} from 'react-router-native';
import {useFonts} from 'expo-font';
import * as Font from 'expo-font';

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
        // Use the font with the fontFamily property after loading
        if (this.state.fontsLoaded) {
            return (
                <NativeRouter>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Login/>}/>
                            <Route exact path="/homepage" element={<HomepageConnected/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route element={<NotFound/>}/>
                        </Routes>
                    </Container>
                </NativeRouter>
            );
        } else {
            return null;
        }
    }
}
