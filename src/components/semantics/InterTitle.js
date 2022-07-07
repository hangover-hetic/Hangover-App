import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';

class InterTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <Text style={styles.text}>
                {this.props.content}
            </Text>
        </>;
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
    },
});

export default InterTitle;
