import React, { useState } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingBottom: 6,
    paddingTop: 6,
    marginVertical: 7,
  },
  text: {
    fontFamily: 'Poppins',
    color: '#000',
    textAlign: 'center',
  },
});

export default CustomButton;
