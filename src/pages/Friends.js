import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { connect } from 'react-redux';
import { fetchFriends } from '../redux/User/userAsync-actions';
import Container from '../components/ui/ScrollContainer';
import Title from '../components/semantics/Title';
import Paragraph from '../components/semantics/Paragraph';
import SectionTitle from '../components/semantics/SectionTitle';
import Span from '../components/semantics/Span';
import WhiteSpan from '../components/semantics/WhiteSpan';
import { FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import TabViewFriend from '../components/TabViewFriend';
import ScrollContainer from '../components/ui/ScrollContainer';


class Friends extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      friends: [],
    };
  }

  handleEmail = (text) => {
    this.setState({ email: text });
  };
  async componentDidMount() {
  
    await this.loadData();
  }

  async loadData() {
    const { fetchFriends } = this.props;
    try {
      await fetchFriends(this.props.actualUser.id);
    } catch (e) {
      console.error(e);
    }
  }

  deleteInvitation = (data) => {
    console.log(data)
    this.loadData();
  };
  acceptInvitation = (data) => {
    console.log(data)
    this.loadData();
  };

  
  render() {
    const { actualUser, userFriends } = this.props;

    return (
      <ScrollContainer>
      {actualUser === null || userFriends === null || !actualUser || !userFriends ? (
        <Paragraph content="loading" />
            
      ) : (
        <>
        <Title content="Mes amis" />
        <View>
          <SectionTitle content="Mon pseudonyme" />
          
             
            <WhiteSpan content={actualUser.email} />
         
          
        </View>
        <View>
          <SectionTitle content="Ajouter un ami" />
          <WhiteSpan content="Email de votre ami" />
          <View style={styles.searchSection}>
            <FontAwesome5 name="user-friends" size={16} color="#9d9d9d" />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#9d9d9d"
              autoCapitalize="none"
              onChangeText={this.handleEmail}
            />
          </View>
          <CustomButton title="Ajouter cet amis" />
        </View>
        <View>
            <TabViewFriend data={userFriends} bindAcceptInvitation={this.acceptInvitation} bindDeletedInvitation={this.deleteInvitation}/>
        </View>
        </>
      )}
      </ScrollContainer>
      
    );
  }
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#9d9d9d',
    marginBottom: 20,
  },

  input: {
    flex: 3,
    height: 40,
    marginLeft: 7,
    color: '#9d9d9d',
  },

  itemList: {
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderColor: '#9d9d9d',
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
  },
  itemListContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  username: {
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
  },
});

const mapStateToProps = (state) => ({
  actualUser: state.user.actualUser,
  userFriends: state.user.userFriends,
});
const mapActionsToProps = {
  fetchFriends,
};

const FriendsConnected = connect(mapStateToProps, mapActionsToProps)(Friends);

export default FriendsConnected;
