import { connect } from 'react-redux';
import Container from '~/components/ui/Container';
import Title from '~/components/semantics/Title';
import { Component } from 'react';
import { FlatList } from 'react-native';
import { fetchInscriptionFestival } from '../../redux/User/userAsync-actions';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import Paragraph from '../../components/semantics/Paragraph';
import FestivalRow from '../../components/FestivalRow';
import { getAbsoluteMediaPath } from '../../services/media';
import dayjs from '../../services/dayjs';
import Toast from 'react-native-root-toast';
import { fetchFestival } from '../../redux/Festival/festival-async-actions';
import { FESTIVAL_ROUTE, INSCRIPTIONS_ROUTE } from './routes';

class Inscriptions extends Component {
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { dispatch } = this.props;
    dispatch(fetchInscriptionFestival);
  }

  async onPressFestival(id) {
    try {
      const { fetchFestival, navigation } = this.props;
      await fetchFestival(id, true);
      navigation.navigate(FESTIVAL_ROUTE);
    } catch (e) {
      Toast.show('Erreur : ' + e);
    }
  }

  render() {
    const { userInscription } = this.props;
    return (
      <Container>
        {userInscription === undefined ? (
          <LoadingIndicator />
        ) : (
          <>
            <Title content={'Mes inscriptions'} />
            <Paragraph content={'Sélectionnez un festival pour accéder à sa map et à son feed'} />
            <FlatList
              style={{ marginTop: 20 }}
              data={userInscription}
              renderItem={({ item }) => {
                return (
                  <FestivalRow
                    name={item.festival.name}
                    cover={getAbsoluteMediaPath(item.festival.cover.contentUrl)}
                    onPress={this.onPressFestival.bind(this)}
                    year={dayjs(item.festival.startDate).format('YYYY')}
                    id={item.festival.id}
                  />
                );
              }}
            />
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  actualUser: state.user.actualUser,
  userInscription: state.user.userInscription,
});

export default connect(mapStateToProps, { fetchFestival })(Inscriptions);
