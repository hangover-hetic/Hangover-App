import React from 'react';
import { connect } from 'react-redux';
import { fetchFestival, fetchFestivalPosts } from '../redux/Festival/festival-async-actions';
import Title from '../components/semantics/Title';
import SectionTitle from '../components/semantics/SectionTitle';
import Container from '../components/ui/Container';
import PostContainer from '../components/feed/PostContainer';
import { listenMercureTopics } from '../services/mercure';
import Paragraph from '../components/semantics/Paragraph';
import { addActualFestivalPosts } from '../redux/Festival/festival-actions';

class Feed extends React.Component {
  constructor(props) {
    super(props);


  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.actualFestival !== null) {
      const { actualFestival, mercureToken } = this.props;

      listenMercureTopics(
        [`https://hangoverapp.com/festival/${actualFestival.id}/feed/`],
        mercureToken,
        this.onNewPost.bind(this)
      );
      console.log('mercure init');
    }
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    const { fetchFestival, fetchFestivalPosts } = this.props;
    try {
      await fetchFestival(1);
      await fetchFestivalPosts(1);
    } catch (e) {
      console.error(e);
    }
  }


  onNewPost({ data }) {
    const {addActualFestivalPosts} = this.props
    const result = JSON.parse(data)
    addActualFestivalPosts(result)
  }

  render() {
    const { posts, actualUser, actualFestival } = this.props;
    return (
      <Container scroll>
        <Title content="Feed" />
        { actualFestival === null  ? (
            <Paragraph content="loading" />
        ) : (
          <>
            <SectionTitle content={actualFestival.name} />
            {posts.map((post, i) => {
              return <PostContainer
                userName={`${actualUser.firstName} ${actualUser.lastName}`}
                festivalName={post.festival.name}
                userProfilePicture={actualUser.profilePicture.contentUrl}
                key={'post-' + i + post.createdAt}
                postImage={post.media.contentUrl}
                postCreatedAt={post.createdAt}
              />;
            })}
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  mercureToken: state.userReducer.mercureToken,
  posts: state.festivalReducer.actualFeed,
  actualUser: state.userReducer.actualUser,
  actualFestival: state.festivalReducer.actualFestival,
});

const mapActionsToProps = {
  fetchFestivalPosts,
  fetchFestival,
  addActualFestivalPosts,
};


const FeedConnected = connect(mapStateToProps, mapActionsToProps)(Feed);

export default FeedConnected;
