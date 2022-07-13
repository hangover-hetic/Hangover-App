import { Component } from 'react';
import Container from './Container';
import { ActivityIndicator, Dimensions, Text } from 'react-native';

class LoadingIndicator extends Component {
  render() {
    return (
      <Container
        styles={{
          justifyContent: 'center',
          height: Dimensions.get('window').height * 0.9,
          width: '100%',
          minHeight: 'auto',
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </Container>
    );
  }
}

export default LoadingIndicator;
