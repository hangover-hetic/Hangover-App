import React       from 'react'
import { Text, View , ScrollView, Row, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import RadioButton from '../components/RadioButton';
import SectionTitle from '../components/semantics/SectionTitle';

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

            <View>
                <ScrollView
                    contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between'
                }}>
                <RadioButton data={this.data} />
                <View>
                    <SectionTitle content='Événements'/>
                </View>
                <View>
                    <SectionTitle content='Tes amis sont intéressés'/>
                </View>
                     
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    userToken : state
})

const HomepageConnected = connect (
    mapStateToProps
)(Homepage);

export default HomepageConnected;

