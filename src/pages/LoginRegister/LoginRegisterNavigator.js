import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import { LOGIN_ROUTE, REGISTER_ROUTE } from './routes';
import Register from './Register';

const Stack = createNativeStackNavigator();

class LoginRegisterNavigator extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={LOGIN_ROUTE} component={Login} />
        <Stack.Screen name={REGISTER_ROUTE} component={Register} />
      </Stack.Navigator>
    );
  }
}

export default LoginRegisterNavigator;
