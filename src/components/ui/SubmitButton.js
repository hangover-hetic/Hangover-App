import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';

class SubmitButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.object,
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress} disabled={this.props.disabled}>
        <View
          style={[
            styles.container,
            { backgroundColor: this.props.disabled ? '#9D9D9D' : '#fff' },
            this.props.style,
          ]}
        >
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,

    borderRadius: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    minWidth: 250,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
  },
});

export default SubmitButton;
