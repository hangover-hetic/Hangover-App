import {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PARAMS_ACCOUNT, UPDATE_ACCOUNT} from "./routes";
import Params from "./Params";
import AccountUpdate from "./AccountUpdate";

const Stack = createNativeStackNavigator();

class AccountNavigator extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={PARAMS_ACCOUNT} component={Params}/>
                <Stack.Screen name={UPDATE_ACCOUNT} component={AccountUpdate}/>
            </Stack.Navigator>
        );
    }
}

export default AccountNavigator;
