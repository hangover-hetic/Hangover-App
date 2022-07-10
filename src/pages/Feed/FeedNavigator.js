import { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feed from './Feed';
import AddPost from './AddPost';
import { ADD_POST_ROUTE, FEED_HOME_ROUTE } from './routes';

const Stack = createNativeStackNavigator();

class FeedNavigator extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={FEED_HOME_ROUTE} component={Feed} />
        <Stack.Screen name={ADD_POST_ROUTE} component={AddPost} />
      </Stack.Navigator>
    );
  }
}

export default FeedNavigator;
