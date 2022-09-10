import { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage';
import { ACCOUNT_ROUTE, FESTIVAL_ROUTE, HOME_ROUTE, INSCRIPTIONS_ROUTE, MAP_ROUTE } from './routes';
import { Dimensions } from 'react-native';
import TabBarIcon from '~/components/TabBarIcon';
import { AccountNavigator } from './Account';
import { FestivalNavigator } from './Festival';
import { connect } from 'react-redux';
import Inscriptions from './Inscriptions';

const Tab = createBottomTabNavigator();

class MainNavigator extends Component {
  render() {
    const { isActualSelected } = this.props;
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
          component={isActualSelected ? FestivalNavigator : Inscriptions}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <TabBarIcon name="event" size={size} active={focused} color={color} />
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

const mapStateToProps = (state) => ({
  isActualSelected: state.festival.isActualSelected,
});

export default connect(mapStateToProps)(MainNavigator);
