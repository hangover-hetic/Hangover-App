import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchFriends } from '../../../redux/User/userAsync-actions';
import Title from '../../../components/semantics/Title';
import { Ionicons } from '@expo/vector-icons';
import Container from '../../../components/ui/Container';
import Span from '../../../components/semantics/Span';
import SectionTitle from '../../../components/semantics/SectionTitle';
import Paragraph from '../../../components/semantics/Paragraph';
import WhiteSpan from '../../../components/semantics/WhiteSpan';
import CustomButton from '../../../components/ui/CustomButton';
import { FRIENDS_ACCOUNT, PARAMS_ACCOUNT } from './routes';
import CarouselContainer from '../../../components/ui/CarouselContainer';
import CardCarouselFestival from '../../../components/CardCarouselFestival';
import CalendarInscription from '../../../components/Calendar';
import ScrollContainer from '../../../components/ui/ScrollContainer';

class Account extends React.Component {
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
    console.log(this.props);
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

  navigateToParams() {
    const { navigation } = this.props;
    navigation.navigate(PARAMS_ACCOUNT);
  }

  navigateToFriends() {
    const { navigation } = this.props;
    navigation.navigate(FRIENDS_ACCOUNT);
  }

  render() {
    const { actualUser, userInscription } = this.props;
    return (
      <ScrollContainer>
        <View style={{ display: 'flex' }}>
          <Title content="Mon compte" />
          <Ionicons
            name="settings-outline"
            color="white"
            size={30}
            onPress={this.navigateToParams.bind(this)}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}
          />
          <Ionicons
            name="card-outline"
            color="white"
            size={30}
            style={{
              position: 'absolute',
              right: 60,
              top: 10,
            }}
          />
        </View>
        <View>
          {actualUser === null ? (
            <Paragraph content="loading" />
          ) : (
            <>
              <View>
                <WhiteSpan content={actualUser.firstName + ' ' + actualUser.lastName} />
                <Span content={actualUser.email} />
              </View>
              <View>
                <SectionTitle content="Mes amis" />
                {/*<WhiteSpan content="Email de votre ami"/>*/}
                {/*<View style={styles.searchSection}>*/}
                {/*    <FontAwesome5 name="user-friends" size={16} color="#9d9d9d"/>*/}
                {/*    <TextInput*/}
                {/*        style={styles.input}*/}
                {/*        underlineColorAndroid="transparent"*/}
                {/*        placeholder="Email"*/}
                {/*        placeholderTextColor="#9d9d9d"*/}
                {/*        autoCapitalize="none"*/}
                {/*        onChangeText={this.handleEmail}*/}
                {/*    />*/}
                {/*</View>*/}
                <CustomButton title="Voir mes amis" onPress={this.navigateToFriends.bind(this)} />
                <View>
                  <SectionTitle content="Mes évènements" />
                  <CarouselContainer
                    items={userInscription}
                    renderItem={CardCarouselFestival}
                    userInscription={true}
                  />
                </View>
                <View>
                  <SectionTitle content="Mon calendrier" />
                  <CalendarInscription data={userInscription} />
                </View>
              </View>
            </>
          )}
        </View>
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
  userInscription: state.user.userInscription,
});
const mapActionsToProps = {
  fetchFriends,
};

const AccountConnected = connect(mapStateToProps, mapActionsToProps)(Account);

export default AccountConnected;
