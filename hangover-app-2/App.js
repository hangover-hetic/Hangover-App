import React            from 'react';
import { View }         from 'react-native';
import Login            from './Pages/Login';
import Register         from './Pages/Register';
import NotFound         from './Pages/NotFound'
import { 
    NativeRouter, 
    Route,
    Routes,
}                       from 'react-router-native';
import HomepageConnected from './Pages/Homepage'


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
