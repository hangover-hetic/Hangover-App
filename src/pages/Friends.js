import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchFriends,
  deleteFriend,
  acceptFriend,
  searchUsersByEmail,
  createInvitation,
} from '~/redux/User/userAsync-actions';
import Title from '~/components/semantics/Title';
import Paragraph from '~/components/semantics/Paragraph';
import SectionTitle from '~/components/semantics/SectionTitle';
import WhiteSpan from '~/components/semantics/WhiteSpan';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '~/components/ui/CustomButton';
import TabViewFriend from '~/components/TabViewFriend';
import ScrollContainer from '~/components/ui/ScrollContainer';
import AutocompleteInput from 'react-native-autocomplete-input';


class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      friends: [],
      filteredEmail: [],
      selectedValue: {},
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

  async deleteInvitation(data) {
    const { deleteFriend, fetchFriends } = this.props;

    if (deleteFriend && this.props) {
      try {
        await deleteFriend(data);
        await fetchFriends(this.props.actualUser.id);
      } catch (e) {
        console.error(e);
      }
    }
  }
  async acceptInvitation(data) {
    const { acceptFriend, fetchFriends } = this.props;

    if (acceptFriend && this.props) {
      try {
        await acceptFriend(data);
        await fetchFriends(this.props.actualUser.id);
      } catch (e) {
        console.error(e);
      }
    }
  }
  async createInvitation(id) {
    const { createInvitation, fetchFriends } = this.props;

    if (createInvitation && this.props) {
      try {
        await createInvitation(id, this.props.actualUser.id);
        await fetchFriends(this.props.actualUser.id);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async updateSearchEmail(val) {
    const { searchUsersByEmail } = this.props;

    if (searchUsersByEmail && this.props && val.length >= 3) {
      try {
        this.setState({ filteredEmail: await searchUsersByEmail(val) });
      } catch (e) {
        console.error(e);
      }
    }
  }

  render() {
    const { actualUser, userFriends } = this.props;
    const { filteredEmail } = this.state;
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

              <View style={styles.searchSection}>
                <FontAwesome5 name="user-friends" size={16} color="#9d9d9d"/>
                <AutocompleteInput
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={{elevation: 5, zIndex: 5, borderWidth: 0}}
                    inputContainerStyle={{
                      backgroundColor: 'red',
                      borderWidth: 0,
                      marginLeft: 5,
                    }}
                  selectionColor="#feac5e"
                  listContainerStyle={styles.listSuggestion}
                  data={filteredEmail}
                  defaultValue={
                    JSON.stringify(this.state.selectedValue) === '{}'
                      ? ''
                      : this.state.selectedValue.email
                  }
                  flatListProps={{
                    keyExtractor: (_, idx) => idx,
                    renderItem: ({ item }) => (
                      <TouchableOpacity
                        style={styles.itemSuggestion}
                        onPress={() => {
                          this.setState({ selectedValue: item });
                          this.setState({ filteredEmail: [] });
                        }}
                      >
                        <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold' }}>
                          {item.firstName} {item.lastName}
                        </Text>
                      </TouchableOpacity>
                    ),
                  }}
                  onChangeText={(text) => this.updateSearchEmail(text)}
                  placeholder="Email de votre ami"
                  placeholderTextColor="#9d9d9d"
                />
              </View>
              <WhiteSpan
                style={{ fontFamily: 'Poppins-SemiBold', alignSelf: 'center' }}
                content={
                  this.state.selectedValue.firstName
                    ? this.state.selectedValue.firstName + ' ' + this.state.selectedValue.lastName
                    : 'Ami non-séléctionné'
                }
              />
              <CustomButton
                title="Ajouter cet ami"
                onPress={
                  this.state.selectedValue.firstName
                    ? () => {
                        this.createInvitation(this.state.selectedValue.id),
                          this.setState({ selectedValue: {} });
                      }
                    : null
                }
              />
            </View>
            <View>
              <TabViewFriend
                data={userFriends}
                bindAcceptInvitation={this.acceptInvitation.bind(this)}
                bindDeletedInvitation={this.deleteInvitation.bind(this)}
              />
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
    zIndex: 5,
    elevation: 5,
  },

  input: {
    flex: 3,
    height: 40,
    marginLeft: 7,
    color: '#9d9d9d',
    backgroundColor: 'red',
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
  listSuggestion: {
    borderRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderColor: '#9d9d9d',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    position: 'absolute',
    backgroundColor: '#202020',
    top: 40,
    elevation: 5,
    zIndex: 5,
    width: '100%',
  },
  itemSuggestion: {
    padding: 10,
    borderBottomWidth: 0.3,
    borderColor: '#9d9d9d',
  },
});

const mapStateToProps = (state) => ({
  actualUser: state.user.actualUser,
  userFriends: state.user.userFriends,
});
const mapActionsToProps = {
  fetchFriends,
  deleteFriend,
  acceptFriend,
  searchUsersByEmail,
  createInvitation,
};

const FriendsConnected = connect(mapStateToProps, mapActionsToProps)(Friends);

export default FriendsConnected;
