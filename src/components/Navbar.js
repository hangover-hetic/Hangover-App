import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Map from '../pages/Map';
import HomepageConnected from '../pages/Homepage';

const Tab = createBottomTabNavigator();

const Navbar = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Homepage" component={HomepageConnected} />
            <Tab.Screen name="Map" component={Map}/>
        </Tab.Navigator>
    )
}

export default Navbar;
