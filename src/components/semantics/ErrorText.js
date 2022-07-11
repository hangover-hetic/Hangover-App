import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

class ErrorText extends React.Component {
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
    color: '#D8000C',
    backgroundColor: '#FFBABA'
  },
});

export default ErrorText;
