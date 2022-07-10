import React       from 'react'
import { Text, View , ScrollView, Row, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import RadioButton from '../components/RadioButton';
import CustomButton from '../components/CustomButton';
import SectionTitle from '../components/semantics/SectionTitle';
import Container from '../components/ui/Container';
import Span from '../components/semantics/Span';

class Homepage extends React.Component {
    constructor (props) {
        super(props);
        this.data = [
            { value: 'Nouveautés' },
            { value: 'Tous les évènements' },
            { value: 'Prochainement' },
            
        ];
    }

    componentDidMount() {
        console.log(this.props.userToken)
    }

    render() {
        
        return (

            <Container>
                <ScrollView>
                    <RadioButton data={this.data} />

                    <View>
                        <SectionTitle content='Événements'/>
                        
                    </View>
                    
                    <View>
                        <SectionTitle content='Tes amis sont intéressés'/>
                        <Span content='Aucune suggestion de tes amis'/>
                        <CustomButton title='Ajouter des amis'/>
                    </View>
                     
                </ScrollView>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
  userToken: state.userReducer.userToken,
});

const HomepageConnected = connect(mapStateToProps)(Homepage);

export default HomepageConnected;
