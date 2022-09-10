import { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Festival from './Festival';
import { FEED_ROUTE, FESTIVAL_ROUTE, MAP_ROUTE } from './routes';
import Map from './Map';
import { FeedNavigator } from './Feed';

const Tab = createMaterialTopTabNavigator();

class FestivalNavigator extends Component {
  render() {
    return (
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: 'black',
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#FEAC5E',
                    },
                    tabBarLabelStyle: {
                        color: 'white',
                        textTransform: 'capitalize',
                    },
                }}
            >
                <Tab.Screen name={FESTIVAL_ROUTE} component={Festival} options={{ title: 'Festival' }} />
                <Tab.Screen name={MAP_ROUTE} component={Map} options={{ title: 'Carte' }} />
                <Tab.Screen name={FEED_ROUTE} component={FeedNavigator} options={{ title: 'Feed' }} />
            </Tab.Navigator>
    );
  }
}

export default FestivalNavigator;
