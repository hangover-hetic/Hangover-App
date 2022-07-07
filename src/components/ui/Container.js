import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>{this.props.children}</SafeAreaView>
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
