import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

class BasicBigText extends React.Component {
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
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
  },
});

export default BasicBigText

