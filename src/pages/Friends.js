import React from 'react';
import { View, Text, TextInput, StyleSheet  } from 'react-native';
import { connect } from 'react-redux';
import { fetchFriends } from '../redux/User/userAsync-actions';
import Container from '../components/ui/Container';
import Title from '../components/semantics/Title';
import SectionTitle from '../components/semantics/SectionTitle';
import Span from '../components/semantics/Span';
import WhiteSpan from '../components/semantics/WhiteSpan';
import { FontAwesome5 } from '@expo/vector-icons'; 
import CustomButton from '../components/CustomButton';


class Friends extends React.Component {
    state = {
        email: ''
    }
    handleEmail = (text) => {
        this.setState({ email: text })
     }
     async componentDidMount() {
        const { dispatch } = this.props;
        // await dispatch(postLogin({ username: 'admin@hangover.com', password: 'password' }));
        await dispatch(fetchFriends(1));
      }
  render() {
    return (
      <Container>
        <Title content='Mes amis'/>
        <View>
            <SectionTitle content='Mon pseudonyme'/>
            <Span content='admin@hangover.com'/>
        </View>
        <View>
            <SectionTitle content='Ajouter un ami'/>
            <WhiteSpan content='Email de votre ami'/>
            <View style = {styles.searchSection}>
                <FontAwesome5 name="user-friends" size={16} color='#9d9d9d' />
                <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                placeholderTextColor = "#9d9d9d"
                autoCapitalize = "none"
                onChangeText = {this.handleEmail}/>
            </View>
            <CustomButton title='Ajouter cet amis'/>
            
        </View>
        <View>
            <SectionTitle content="Liste d'amis"/>
            <Span content='admin@hangover.com'/>
        </View>
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    searchSection: {
        flexDirection:'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#9d9d9d',
        marginBottom: 20
    },

    input: {
       flex: 3,
       
       height: 40,
       marginLeft: 7,
       color: '#9d9d9d'
    },

 })

 const mapStateToProps = (state) => ({
    userToken: state.userReducer.userToken,
    mercureToken: state.userReducer.mercureToken,
  });

 const FriendsConnected = connect(mapStateToProps)(Friends);

export default Friends;