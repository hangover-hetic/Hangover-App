import React             from 'react';
import { View }          from 'react-native';
import Login             from './pages/Login';
import HomepageConnected from './pages/Homepage';
import Register          from './pages/Register';
import NotFound          from './pages/NotFound';
import { 
    NativeRouter, 
    Route,
    Routes,
}                        from 'react-router-native';

export default function App() {
    return <>
        <NativeRouter>
            <View>
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

{/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/}
