import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PARAMS_ACCOUNT, UPDATE_ACCOUNT, ACCOUNT, FRIENDS_ACCOUNT, TERMS_OF_USE } from './routes';
import Params from './Params';
import AccountUpdate from './AccountUpdate';
import Account from './Account';
import Friends from '../Friends';
import UserUpdateConnected from './UserUpdate';
import TermsOfUse from './TermsOfUse';

const Stack = createNativeStackNavigator();

class AccountNavigator extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {},
          headerTransparent: true,
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name={ACCOUNT} component={Account} options={{ headerShown: false }} />
        <Stack.Screen
          name={PARAMS_ACCOUNT}
          component={Params}
          options={{ headerShown: true, title: '' }}
        />
        <Stack.Screen
          name={FRIENDS_ACCOUNT}
          component={Friends}
          options={{ headerShown: true, title: '' }}
        />
        <Stack.Screen
          name={UPDATE_ACCOUNT}
          component={UserUpdateConnected}
          options={{ headerShown: true, title: '' }}
        />
        <Stack.Screen
          name={TERMS_OF_USE}
          component={TermsOfUse}
          options={{ headerShown: true, title: '' }}
        />
      </Stack.Navigator>
    );
  }
}

export default AccountNavigator;
