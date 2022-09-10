import React from 'react'
import Container from '../../../components/ui/Container';
import Title from '../../../components/semantics/Title';
import BigSpan from '../../../components/semantics/BigSpan';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

class About extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Container>
                <View style={interSpace.space}/>
                <Title content="À propos"/>
                <View style={interSpace.space}/>
                <BigSpan content="Qui sommes nous ?" />
                <View style={interSpace.space}/>
                <Text style={styles.text}>
                    Hangover est une équipe de jeune apprenti développeur composé d'Adrien, Cécile, Paul, Piero, Jessy, Timothée, Tristan.
                    Nous avons développé cette application, car nous sommes des amateurs d'événements festif tel que les festivals, Hangover est donc un projet de passionner.
                    C'est un immense plaisir pour nous de vous transmettre notre amour pour ce genre d'événements à travers notre application.
                </Text>
                <View style={interSpace.space}/>
                <BigSpan content="L'équipe hangover."/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    text: {
      color: '#9D9D9D',
      fontSize: 12,
      lineHeight: 21,
      letterSpacing: 0.5,
      fontFamily: 'Poppins',
    },
});
const interSpace = StyleSheet.create({
    space : {
        padding: 10
    }
})

export default About;
