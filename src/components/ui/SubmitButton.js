import React from "react";
import {StyleSheet, TouchableWithoutFeedback, View, Text} from "react-native";

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            {this.props.title}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        marginBottom : 10,
        marginTop : 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        height : 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        minWidth : 250,
    },
    text: {
        fontFamily: 'Poppins-SemiBold'
    }
});

export default SubmitButton;
