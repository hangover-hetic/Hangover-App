import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

class WhiteSpan extends React.Component {
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
    color: 'white',
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.5,
    marginTop: 5,
    fontFamily: 'Poppins',
  },
});

export default WhiteSpan;
