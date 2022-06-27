import { AppRegistry } from 'react-native';
import { Provider }    from 'react-redux';
import reduxStore      from './redux/store';
import App             from './App';

const RNRedux = () => (
    <Provider store={ reduxStore }>
        <App />
    </Provider>
)

AppRegistry.registerComponent(RNRedux);
