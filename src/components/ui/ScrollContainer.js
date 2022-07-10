import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class ScrollContainer extends React.Component {
  static propTypes = {
    refreshControl: PropTypes.element,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { refreshControl, children } = this.props;
    return (
      <ScrollView style={styles.container} refreshControl={refreshControl}>
        {children}
      </ScrollView>
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

export default ScrollContainer;
