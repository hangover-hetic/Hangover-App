import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    let { width } = Dimensions.get('window');
    this.state = {
      width: width,
    };
  }

  getStyle() {
    return {
      form: {
        justifyItems: 'center',
        textAlign: 'center',
        color: '#fff',
        padding: 20,
        // top: '50%',
        // transform: [{translateY: -(this.state.width / 2)}],
      },
    };
  }

  render() {
    const styles = this.getStyle();

    return (
      <>
        <View style={styles.form}>{this.props.children}</View>
      </>
    );
  }
}

export default FormContainer;
