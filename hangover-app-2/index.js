import { AppRegistry, Text } from 'react-native';
import { Provider }    from 'react-redux';
import reduxStore      from './src/redux/store';
import App             from './App';
import { registerRootComponent } from 'expo';

const RNRedux = () => (
    <Provider store={ reduxStore }>
        <App />
    </Provider>
)

registerRootComponent(RNRedux);
AppRegistry.registerComponent(RNRedux);
