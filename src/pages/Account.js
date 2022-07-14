import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Paragraph from '../components/semantics/Paragraph';
import SectionTitle from '../components/semantics/SectionTitle';
import Span from '../components/semantics/Span';
import Title from '../components/semantics/Title';
import WhiteSpan from '../components/semantics/WhiteSpan';
import ScrollContainer from '../components/ui/ScrollContainer';
import { Feather, Ionicons } from '@expo/vector-icons';
import { fetchInscriptionFestival } from '../redux/User/userAsync-actions';
import dayjs from '../services/dayjs';
import CalendarInscription from '../components/Calendar';
import CarouselContainer from '../components/ui/CarouselContainer';
import CardCarouselFestival from '../components/CardCarouselFestival';

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { fetchInscriptionFestival } = this.props;
    try {
      await fetchInscriptionFestival();
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { actualUser, userInscription } = this.props;

    return (
      <ScrollContainer noPadding={true}>
        {actualUser === null || !actualUser || userInscription === null || !userInscription ? (
          <Paragraph content="loading"></Paragraph>
        ) : (
          <>
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Title content="Mon compte"></Title>
                <Feather name="settings" size={26} color="white" />
              </View>
              <View>
                <WhiteSpan
                  content={`${actualUser.firstName} ${actualUser.lastName} ━━━━━ ${actualUser.email}`}
                />
              </View>
            </View>
            <View>
              <SectionTitle content="Mes amis" />
              <TouchableOpacity style={styles.friendsButton}>
                <Ionicons name="person-add" size={16} color="#9d9d9d" />
                <Span style={styles.spanButton} content="Gérer / Ajouter des amis" />
              </TouchableOpacity>
            </View>
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
          </>
        )}
      </ScrollContainer>
    );
  }
}
const styles = StyleSheet.create({
  friendsButton: {
    flex: 1,
    flexDirection: 'row',
  },
  spanButton: {
    marginLeft: 8,
  },
});

const mapStateToProps = (state) => ({
  actualUser: state.user.actualUser,
  userInscription: state.user.userInscription,
});
const mapActionsToProps = {
  fetchInscriptionFestival,
};

const AccountConnected = connect(mapStateToProps, mapActionsToProps)(Account);

export default AccountConnected;
