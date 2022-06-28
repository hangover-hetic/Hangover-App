import React             from 'react';
import { View }          from 'react-native';
import Login             from './pages/Login';
import Register          from './pages/Register';
import HomepageConnected from './pages/Homepage';
import NotFound          from './pages/NotFound';
import { 
    NativeRouter, 
    Route,
    Routes,
}                        from 'react-router-native';
import { StyleSheet }    from 'react-native';

export default function App() {
    return <>
        <NativeRouter>
            <View style={styles.container}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route exact path="/homepage" element={<HomepageConnected />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<NotFound />} />
                </Routes>
            </View> 
        </NativeRouter>
    </>;
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#354142',
    alignItems: 'center',
    justifyContent: 'center',
    },
});
