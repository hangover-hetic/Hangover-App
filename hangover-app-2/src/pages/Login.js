import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Paragraph from '../components/semantics/Paragraph';
import SectionTitle from '../components/semantics/SectionTitle';
import Title from '../components/semantics/Title';

class Login extends React.Component {

    render() {
        return <>
            <View style={styles.titleContainer}>
                <Title content={'Programmation'}/>
                <SectionTitle content={'Événements'}/>
                <Paragraph content={'Mon paragraphe est ici'}/>
            </View>
        </>;
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        // textAlign: 'center',
        // height: '100%',
        // flexDirection: 'row',
        // backgroundColor: '#b8b9bf',
        // padding: 20,
        // paddingTop: 50
    },
    logo: {
        width: 100,
    },
});

export default Login;
