import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RadioButton from '../../components/RadioButton';
import CustomButton from '../../components/ui/CustomButton';
import SectionTitle from '../../components/semantics/SectionTitle';
import Span from '../../components/semantics/Span';
import Title from '../../components/semantics/Title';
import CarouselContainer from '../../components/ui/CarouselContainer';
import CardCarouselFestival from '../../components/CardCarouselFestival';
import { fetchAllFestivals, fetchFestival } from '../../redux/Festival/festival-async-actions';
import {
  fetchInscriptionFestival,
  fetchInscriptionFriends,
} from '../../redux/User/userAsync-actions';
import CalendarInscription from '../../components/Calendar';
import ScrollContainer from '../../components/ui/ScrollContainer';
import dayjs from '~/services/dayjs';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import {FESTIVAL_ROUTE} from "./routes";
import {FESTIVAL_ROUTE as FESTIVAL_FESTIVAL_ROUTE} from "./Festival/routes";
import Toast from "react-native-root-toast";

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

  async onPressFestival({item}) {
    try {
      const { fetchFestival, navigation } = this.props;
      await fetchFestival(item.id, true);
      navigation.navigate(FESTIVAL_ROUTE, {
        screen : FESTIVAL_FESTIVAL_ROUTE
      });
    } catch (e) {
      Toast.show('Erreur fetch : ' + e);
    }
  }

  renderCardCarousel(item, index) {
    return <CardCarouselFestival item={item.item} index={index} onPress={() => this.onPressFestival(item)}/>
  }

  render() {
    const { festivals, userInscription, friendsInscription } = this.props;
    const { radioTagSelect } = this.state;

    return (
      <ScrollContainer noPadding={true}>
        {festivals === null ||
        festivals.length === 0 ||
        userInscription === null ||
        !userInscription ? (
          <LoadingIndicator />
        ) : (
          <ScrollView style={styles.scrollview}>
            <View style={styles.firstview}>
              <Title content={'Hangover'} alignSelf="center" fontSize={45}/>
              <View style={styles.view}>
                
                <SectionTitle content="Événements" />
                <RadioButton data={this.data} bindSelected={this.selectTag} />
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
                  renderItem={this.renderCardCarousel.bind(this)}
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
              <SectionTitle style={{marginTop: 30}} content="Calendrier" />
            </View>
            <View style={styles.calendar}>
              
              <CalendarInscription data={userInscription} />
            </View>
          </ScrollView>
        )}
      </ScrollContainer>
    );
  }
}

const styles = StyleSheet.create({
  view:{
    marginTop: 15
  },
  firstview:{
    padding:20,
    paddingBottom: 0
  }
  
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
  fetchFestival
};
const HomepageConnected = connect(mapStateToProps, mapActionsToProps)(Homepage);

export default HomepageConnected;
