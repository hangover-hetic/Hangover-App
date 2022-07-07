import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

class Container extends React.Component {
  static propTypes = {
    scroll: PropTypes.bool,
  };
  static defaultProps = {
    scroll: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { scroll } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {
          scroll ? <ScrollView>{this.props.children}</ScrollView> : this.props.children
        }
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
  },
});

export default Container;
