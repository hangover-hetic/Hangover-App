import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import RadioButton from '../components/RadioButton';
import CustomButton from '../components/CustomButton';
import SectionTitle from '../components/semantics/SectionTitle';
import Container from '../components/ui/Container';
import Span from '../components/semantics/Span';
import CarouselContainer from '../components/ui/CarouselContainer';
import CardCarouselFestival from '../components/CardCarouselFestival';
import {
  fetchAllFestivals,
  fetchInscriptionFestival,
} from '../redux/Festival/festival-async-actions';
import Paragraph from '../components/semantics/Paragraph';
import CalendarInscription from '../components/Calendar';
import ScrollContainer from '../components/ui/ScrollContainer';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.data = [{ value: 'Nouveautés' }, { value: 'Prochainement' }];
    this.state = {
      festivals: [],
      radioTagSelect: 'Tous',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { fetchAllFestivals, fetchInscriptionFestival } = this.props;
    try {
      await fetchAllFestivals();
      await fetchInscriptionFestival();
    } catch (e) {
      console.error(e);
    }
  }
  selectTag = (data) => {
    this.setState({ radioTagSelect: data });
  };

  render() {
    const { festivals, userInscription } = this.props;

    return (
      <ScrollContainer noPadding={true}>
        {festivals === null ||
        festivals.length === 0 ||
        userInscription === null ||
        userInscription.length === 0 ? (
          <Paragraph content="loading" />
        ) : (
          <ScrollView>
            <RadioButton data={this.data} bindSelected={this.selectTag} />
            <View>
              <SectionTitle content="Événements" />
              <CarouselContainer items={festivals} renderItem={CardCarouselFestival} />
            </View>
            <View>
              <SectionTitle content="Tes amis sont intéressés" />
              <Span content="Aucune suggestion de tes amis" />
              <CustomButton title="Ajouter des amis" />
            </View>
            <View>
              <SectionTitle content="Calendrier" />
              <CalendarInscription data={userInscription} />
            </View>
          </ScrollView>
        )}
      </ScrollContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  festivals: state.festival.festivals,
  userToken: state.user.userToken,
  userInscription: state.user.userInscription,
});

const mapActionsToProps = {
  fetchAllFestivals,
  fetchInscriptionFestival,
};
const HomepageConnected = connect(mapStateToProps, mapActionsToProps)(Homepage);

export default HomepageConnected;
