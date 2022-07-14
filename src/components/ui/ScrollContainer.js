import React from 'react';
import { Platform, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

class ScrollContainer extends React.Component {
  static propTypes = {
    refreshControl: PropTypes.element,
  };

  constructor(props) {
    super(props);
  }

  getStyles() {
    return {
      container: {
        backgroundColor: '#202020',
        minHeight: '100%',
        color: '#fff',
        padding: this.props.noPadding === true ? 0 : 20,
        paddingTop: Platform.OS === 'ios' ? (this.props.noPadding === true ? 0 : 50) : 0,
      },
    };
  }

  render() {
    const styles = this.getStyles();
    const { refreshControl, children } = this.props;
    return (
      <ScrollView style={styles.container} refreshControl={refreshControl}>
        {children}
      </ScrollView>
    );
  }
}

export default ScrollContainer;
