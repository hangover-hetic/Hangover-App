import React from 'react';
import { View, StyleSheet } from 'react-native';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={styles.container}>{this.props.children}</View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    minHeight: '100%',
    color: '#fff',
    padding: 20,
    paddingTop: 50,
  },
});

export default Container;
