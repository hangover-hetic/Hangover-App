import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

class ScrollContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <ScrollView style={styles.container}>
                {this.props.children}
            </ScrollView>
        </>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202020',
        minHeight: '100%',
        color: '#fff',
        padding: 20,
        paddingTop: 50
    }
})

export default ScrollContainer
