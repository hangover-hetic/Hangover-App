import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

class Span extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Text style={styles.text}>{this.props.content}</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#9D9D9D',
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.5,
    fontFamily: 'Poppins',
  },
});

export default Span;
