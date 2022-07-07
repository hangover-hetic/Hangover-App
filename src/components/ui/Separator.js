import React from 'react';
import { View, StyleSheet } from 'react-native';

class Separator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={styles.container}>{this.props.children}</View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: '#9D9D9D',
    width: '80%',
    alignSelf: 'center',
  },
});

export default Separator;
