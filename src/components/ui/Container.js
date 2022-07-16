import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

class Container extends React.Component {
  static propTypes = {
    styles: PropTypes.object,
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
      },
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <SafeAreaView style={[styles.container, this.props.style]}>
        {this.props.children}
      </SafeAreaView>
    );
  }
}

export default Container;
