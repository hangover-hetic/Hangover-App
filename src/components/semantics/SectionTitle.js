import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

class SectionTitle extends React.Component {
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
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 15
    },
});

export default SectionTitle;
