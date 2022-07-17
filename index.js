import { AppRegistry, LogBox, Text } from 'react-native';
import { Provider } from 'react-redux';
import reduxStore from './src/redux/store';
import App from './App';
import { registerRootComponent } from 'expo';

const ignoreWarns = ['ViewPropTypes will be removed'];
const warn = console.warn;
console.warn = (...arg) => {
  for (let i = 0; i < ignoreWarns.length; i++) {
    if (arg[0].startsWith(ignoreWarns[i])) return;
  }
  warn(...arg);
};

LogBox.ignoreLogs(ignoreWarns);

const RNRedux = () => (
  <Provider store={reduxStore}>
    <App />
  </Provider>
);

registerRootComponent(RNRedux);
AppRegistry.registerComponent(RNRedux);
