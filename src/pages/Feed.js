import React from 'react';
import { connect } from 'react-redux';
import { postLogin } from '../redux/User/userAsync-actions';
import { fetchFestival, fetchFestivalPosts } from '../redux/Festival/festival-async-actions';
import Title from '../components/semantics/Title';
import SectionTitle from '../components/semantics/SectionTitle';
import Container from '../components/ui/Container';
import PostContainer from '../components/feed/PostContainer';

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
    const {posts, actualUser} = this.props
    return (
      <Container scroll>
        <Title content="Feed" />
        <SectionTitle content="Fil d'actualités" />
        {
          posts.map(post => (
            <PostContainer
              userName={`${actualUser.firstName} ${actualUser.lastName}`}
              festivalName={post.festival.name}
              userProfilePicture={actualUser.profilePicture.contentUrl}
              key={"post-" + post.id}
              postImage={post.media.contentUrl}
              postCreatedAt={post.createdAt}
            />
          ))
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userReducer.userToken,
  mercureToken: state.userReducer.mercureToken,
  posts: state.festivalReducer.actualFeed,
  actualUser: state.userReducer.actualUser,
});

const FeedConnected = connect(mapStateToProps)(Feed);

export default FeedConnected;
