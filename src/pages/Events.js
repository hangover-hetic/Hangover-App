import React from 'react';
import { client, baseUrl } from '../api/client';
import SectionTitle from '../components/semantics/SectionTitle';
import Title from '../components/semantics/Title';
import Container from '../components/ui/Container';
import Carousel from '../components/ui/Carousel';
import ScrollContainer from '../components/ui/ScrollContainer';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      festivals: [],
    };
  }

  componentDidMount() {
    client.get('festivals').then((response) => {
      this.setState({ festivals: response.data });
    });
  }

  render() {
    return (
      <>
        <ScrollContainer>
          <SectionTitle content={'Événements'} />
          <Carousel items={this.state.festivals} />
          <SectionTitle content={'Tes amis sont intéressés'} />
        </ScrollContainer>
      </>
    );
  }
}

export default Events;
