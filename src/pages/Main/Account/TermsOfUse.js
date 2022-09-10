import React from 'react'
import { View } from 'react-native';
import Container from '../../../components/ui/Container';
import Title from '../../../components/semantics/Title';
import { Text } from 'react-native';
import BigSpan from '../../../components/semantics/BigSpan';
import { StyleSheet } from 'react-native';
import { Component } from 'react';

class TermsOfUse extends React.Component {
    render() {
        return <>
            <Container>
                <View style={interSpace.space}/>
                <Title content={"Conditions"} />
                <Title content={"d'utilisation"} />
                <View style={interSpace.space}/>
                <BigSpan content={"Votre confidentialité"}/>
                <View style={interSpace.space}/>
                <Text style={styles.text}>
                    Nous traitons vos données pour fournir du contenu ou des publicités. 
                    Nous analysons la diffusion de ce contenu ou de ces publicités pour en tirer des informations sur notre site web. Nous partageons ces informations avec nos partenaires sur la base d’un consentement. 
                    Vous pouvez exercer votre droit de consentement, sur la base d’une finalité spécifique ci-dessous ou au niveau de chaque partenaire disponible à partir du lien proposé sous la finalité associée. 
                    Ces choix seront signalés à nos fournisseurs participant au Transparency and Consent Framework.
                    Plus d’informations.
                </Text>
            </Container>
        </>
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

export default TermsOfUse;
