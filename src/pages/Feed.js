import React from 'react';
import { connect } from 'react-redux';
import { postLogin } from '../redux/User/userAsync-actions';
import { fetchFestival, fetchFestivalPosts } from '../redux/Festival/festival-async-actions';
import Title from '../components/semantics/Title';
import SectionTitle from '../components/semantics/SectionTitle';
import Container from '../components/ui/Container';

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    // await dispatch(postLogin({ username: 'admin@hangover.com', password: 'password' }));
    await dispatch(fetchFestival(1));
    await dispatch(fetchFestivalPosts(1));
  }

  render() {
    return (
      <Container>
        <Title content="Feed" />
        <SectionTitle content="Fil d'actualités" />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userReducer.userToken,
  mercureToken: state.userReducer.mercureToken,
});

const FeedConnected = connect(mapStateToProps)(Feed);

export default FeedConnected;
