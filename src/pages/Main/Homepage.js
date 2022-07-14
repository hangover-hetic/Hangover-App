import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import RadioButton from '~/components/RadioButton';
import CustomButton from '~/components/CustomButton';
import SectionTitle from '~/components/semantics/SectionTitle';
import Container from '~/components/ui/Container';
import Span from '~/components/semantics/Span';
import CarouselContainer from '~/components/ui/CarouselContainer';
import CardCarouselFestival from '~/components/CardCarouselFestival';
import { fetchAllFestivals } from '~/redux/Festival/festival-async-actions';
import Paragraph from '~/components/semantics/Paragraph';
import LoadingIndicator from '../../components/ui/LoadingIndicator';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      { value: 'Nouveautés' },
      { value: 'Tous les évènements' },
      { value: 'Prochainement' },
    ];
    this.state = {
      festivals: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { fetchAllFestivals } = this.props;
    try {
      await fetchAllFestivals();
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { festivals } = this.props;

    return (
      <Container>
        {festivals === null || festivals.length === 0 ? (
          <LoadingIndicator />
        ) : (
          <ScrollView>
            <RadioButton data={this.data} />
            <View>
              <SectionTitle content="Événements" />
              <CarouselContainer items={festivals} renderItem={CardCarouselFestival} />
            </View>
            <View>
              <SectionTitle content="Tes amis sont intéressés" />
              <Span content="Aucune suggestion de tes amis" />
              <CustomButton title="Ajouter des amis" />
            </View>
          </ScrollView>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  festivals: state.festival.festivals,
  userToken: state.user.userToken,
});

const mapActionsToProps = {
  fetchAllFestivals,
};
const HomepageConnected = connect(mapStateToProps, mapActionsToProps)(Homepage);

export default HomepageConnected;
