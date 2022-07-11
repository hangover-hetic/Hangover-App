import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

class SuccessText extends React.Component {
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
    color: '#270',
    backgroundColor: '#DFF2BF',
    alignSelf: 'center'
  },
});

export default SuccessText;
