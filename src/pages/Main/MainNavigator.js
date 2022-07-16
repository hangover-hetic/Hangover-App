import { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Festival from './Festival';
import { FeedNavigator } from './Feed';
import Homepage from './Homepage';
import Map from './Map';
import {
  ACCOUNT_ROUTE,
  FEED_ROUTE,
  FESTIVAL_ROUTE,
  FRIENDS_ROUTE,
  HOME_ROUTE,
  MAP_ROUTE,
} from './routes';
import { Dimensions } from 'react-native';
import TabBarIcon from '~/components/TabBarIcon';
import { AccountNavigator } from './Account';

const Tab = createBottomTabNavigator();

class LoginRegisterNavigator extends Component {
  render() {
    const tabBarWidth = 300;
    const tabBarLeft = (Dimensions.get('window').width - tabBarWidth) / 2;
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            left: tabBarLeft,
            bottom: 30,
            justifyContent: 'center',
            backgroundColor: '#3D3D3D',
            height: 54,
            width: tabBarWidth,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 23,
            borderWidth: 0,
            borderTopColor: 'transparent',
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#d9d9d9',
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name={HOME_ROUTE}
          component={Homepage}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <TabBarIcon name="home" size={size} active={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={FESTIVAL_ROUTE}
          component={Festival}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <TabBarIcon name="event" size={size} active={focused} color={color} />
            ),
          }}
        />

        {/*<Tab.Screen*/}
        {/*    name={FRIENDS_ROUTE}*/}
        {/*    component={Friends}*/}
        {/*    options={{*/}
        {/*        tabBarIcon: ({focused, size, color}) => (*/}
        {/*            <TabBarIcon name="group" size={size} active={focused} color={color}/>*/}
        {/*        ),*/}
        {/*    }}*/}
        {/*/>*/}
        <Tab.Screen
          name={FEED_ROUTE}
          component={FeedNavigator}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <TabBarIcon name="image" size={size} active={focused} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name={MAP_ROUTE}
          component={Map}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <TabBarIcon name="map" size={size} active={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={ACCOUNT_ROUTE}
          component={AccountNavigator}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <TabBarIcon name="account-circle" size={size} active={focused} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default LoginRegisterNavigator;
