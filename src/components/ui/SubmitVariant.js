import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class SubmitVariant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <LinearGradient
            colors={['#feac5e', '#c779d0', '#4bc0c8']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            locations={[0, 0.5, 1]}
            style={styles.container}
          >
            <Text style={styles.text}> {this.props.title}</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </>
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
    color: '#fff',
  },
});

export default SubmitVariant;
