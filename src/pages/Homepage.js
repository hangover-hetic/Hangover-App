import React from 'react';
import {  View, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import RadioButton from '../components/RadioButton';
import CustomButton from '../components/CustomButton';
import SectionTitle from '../components/semantics/SectionTitle';
import Container from '../components/ui/Container';
import Span from '../components/semantics/Span';
import CarouselContainer from "../components/ui/CarouselContainer";
import {client} from "../api/client";
import CardCarouselFestival from "../components/CardCarouselFestival";

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
    console.log(this.props.userToken);
    client.get('festivals').then((response) => {
      this.setState({festivals: response.data});
    });
  }


  render() {
    return (
      <Container>
        <ScrollView>
          <RadioButton data={this.data} />
          <View>
            <SectionTitle content="Événements" />
            <CarouselContainer
                items={this.state.festivals}
                renderItem={CardCarouselFestival}
            />
          </View>

          <View>
            <SectionTitle content="Tes amis sont intéressés" />
            <Span content="Aucune suggestion de tes amis" />
            <CustomButton title="Ajouter des amis" />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.user.userToken,
});

const HomepageConnected = connect(mapStateToProps)(Homepage);

export default HomepageConnected;
