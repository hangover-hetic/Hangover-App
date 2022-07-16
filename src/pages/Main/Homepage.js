import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RadioButton from '../../components/RadioButton';
import CustomButton from '../../components/ui/CustomButton';
import SectionTitle from '../../components/semantics/SectionTitle';
import Span from '../../components/semantics/Span';
import CarouselContainer from '../../components/ui/CarouselContainer';
import CardCarouselFestival from '../../components/CardCarouselFestival';
import { fetchAllFestivals } from '../../redux/Festival/festival-async-actions';
import {
  fetchInscriptionFestival,
  fetchInscriptionFriends,
} from '../../redux/User/userAsync-actions';
import Paragraph from '../../components/semantics/Paragraph';
import CalendarInscription from '../../components/Calendar';
import ScrollContainer from '../../components/ui/ScrollContainer';
import dayjs from '~/services/dayjs';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.data = [{ value: 'Prochainement' }];
    this.state = {
      festivals: [],
      radioTagSelect: 'Tous',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { fetchAllFestivals, fetchInscriptionFestival, fetchInscriptionFriends } = this.props;
    try {
      await fetchAllFestivals();
      await fetchInscriptionFestival();
      await fetchInscriptionFriends();
    } catch (e) {
      console.error(e);
    }
  }
  selectTag = (data) => {
    this.setState({ radioTagSelect: data });
  };

  render() {
    const { festivals, userInscription, friendsInscription } = this.props;
    const { radioTagSelect } = this.state;

    return (
      <ScrollContainer>
        {festivals === null ||
        festivals.length === 0 ||
        userInscription === null ||
        !userInscription ? (
          <Paragraph content="loading" />
        ) : (
          <ScrollView>
            <View style={styles.view}>
              <RadioButton data={this.data} bindSelected={this.selectTag} />
              <SectionTitle content="Événements" />
              <CarouselContainer
                items={
                  radioTagSelect === 'Tous'
                    ? festivals.filter((festival) => dayjs(festival.startDate) >= dayjs())
                    : festivals.filter(
                        (festival) =>
                          dayjs(festival.startDate) >= dayjs() &&
                          dayjs(festival.startDate) <= dayjs().add(2, 'month')
                      )
                }
                renderItem={CardCarouselFestival}
              />
            </View>
            <View style={styles.view}>
              <SectionTitle content="Tes amis sont intéressés" />
              {friendsInscription === [] ? (
                <Span content="Aucune suggestion de tes amis" />
              ) : (
                <CarouselContainer
                  items={friendsInscription}
                  renderItem={CardCarouselFestival}
                  userInscription={true}
                />
              )}

              <CustomButton title="Ajouter des amis" />
            </View>
            <View style={styles.view}>
              <SectionTitle content="Calendrier" />
              <CalendarInscription data={userInscription} />
            </View>
          </ScrollView>
        )}
      </ScrollContainer>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 25,
  },
});

const mapStateToProps = (state) => ({
  festivals: state.festival.festivals,
  userToken: state.user.userToken,
  userInscription: state.user.userInscription,
  friendsInscription: state.user.userInscriptionFriends,
});

const mapActionsToProps = {
  fetchAllFestivals,
  fetchInscriptionFestival,
  fetchInscriptionFriends,
};
const HomepageConnected = connect(mapStateToProps, mapActionsToProps)(Homepage);

export default HomepageConnected;
