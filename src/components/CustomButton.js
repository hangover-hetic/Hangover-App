import React, {useState} from 'react';
import {TouchableWithoutFeedback, View, Text, StyleSheet} from 'react-native';
import BigSpan from './semantics/BigSpan';

const SubmitButton = ({title, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <BigSpan content={title} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        backgroundColor: '#EC6A0A',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        width: 250,
        elevation: 4,
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 80,
    },
});

export default SubmitButton;
