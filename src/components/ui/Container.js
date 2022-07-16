import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

class Container extends React.Component {
  static propTypes = {
    styles: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, this.props.style]}>
        {this.props.children}
      </SafeAreaView>
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
    paddingBottom: 200,
  },
});

export default Container;
