import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';

class Paragraph extends React.Component {
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
        color: '#fff',
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: .5,
        fontFamily: 'Poppins'
    },
});

export default Paragraph;
