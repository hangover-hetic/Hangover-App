import React            from 'react';
import { View }         from 'react-native';
import Homepage         from './pages/Homepage';
import Login            from './pages/Login';
import Register         from './pages/Register';
import NotFound         from './pages/NotFound';
import { 
    NativeRouter, 
    Route, 
    Link 
}                       from 'react-router-native';

export default function App() {
    return <>
        <NativeRouter>
            <View>
                <Route exact path="/" component={ Homepage } />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route element={<NotFound />} />
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
