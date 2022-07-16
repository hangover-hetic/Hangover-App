import React from 'react';
import { connect } from 'react-redux';
import { FlatList, RefreshControl, Vibration, View } from 'react-native';
import Toast from 'react-native-root-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchFestival, fetchFestivalPosts } from '~/redux/Festival/festival-async-actions';
import Title from '~/components/semantics/Title';
import SectionTitle from '~/components/semantics/SectionTitle';
import PostContainer from '~/components/feed/PostContainer';
import { addActualFestivalPosts } from '~/redux/Festival/festival-actions';
import { ADD_POST_ROUTE } from './routes';
import { listenMercure } from '~/services/mercure';
import Container from '../../../components/ui/Container';
import LoadingIndicator from '../../../components/ui/LoadingIndicator';
import { getProfilePicture } from '../../../services/media';

class Feed extends React.Component {
  mercureInit = false;

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      successConnexionMessage: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.actualFestival !== null && !this.mercureInit) {
      const { actualFestival, mercureToken } = this.props;

      listenMercure([actualFestival.mercureFeedTopics], mercureToken, this.onNewPost.bind(this));
      this.mercureInit = true;
      console.log('mercure init');
    }
  }

  setSuccessMessage = () => this.setState({ successConnexionMessage: true });

  componentDidMount() {
    this.loadData();
    setTimeout(() => {
      this.setSuccessMessage();
    }, 3000);
  }

  async loadData() {
    const { fetchFestival, fetchFestivalPosts } = this.props;
    try {
      await fetchFestival(3);
      await fetchFestivalPosts(3);
    } catch (e) {
      console.error(e.response.data);
    }
  }

  onNewPost({ data }) {
    const { addActualFestivalPosts } = this.props;
    const result = JSON.parse(data);
    addActualFestivalPosts(result);
    Vibration.vibrate();
    Toast.show('Un nouveau post est arrivé dans le feed !', {
      duration: Toast.durations.LONG,
    });
  }

  async onRefresh() {
    this.setState({ isRefreshing: true });
    await this.loadData();
    this.setState({ isRefreshing: false });
  }

  navigateToAddPost() {
    const { navigation } = this.props;
    navigation.navigate(ADD_POST_ROUTE);
  }

  render() {
    const { posts, actualUser, actualFestival } = this.props;
    const { isRefreshing } = this.state;
    return (
      <Container
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={this.onRefresh.bind(this)} />
        }
      >
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Title width={'90%'} content="Feed" />
          <Ionicons
            name="add-circle"
            color="white"
            size={40}
            onPress={this.navigateToAddPost.bind(this)}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}
          />
        </View>
        {actualFestival === null || actualUser === null ? (
          <LoadingIndicator />
        ) : (
          <>
            <SectionTitle content={actualFestival.name} />
            <FlatList
              data={posts}
              renderItem={({ item: post, id }) => (
                <PostContainer
                  userName={`${post.relatedUser?.firstName} ${post.relatedUser?.lastName}`}
                  userProfilePicture={getProfilePicture(post.relatedUser?.profilePicture)}
                  key={'post-' + id + post.createdAt}
                  postImage={post.media?.contentUrl}
                  postCreatedAt={post.createdAt}
                  message={post.message}
                />
              )}
            />
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  mercureToken: state.user.mercureToken,
  posts: state.festival.actualFeed,
  actualUser: state.user.actualUser,
  actualFestival: state.festival.actualFestival,
  successConnexion: state.user.userLoginSuccess,
});

const mapActionsToProps = {
  fetchFestivalPosts,
  fetchFestival,
  addActualFestivalPosts,
};

const FeedConnected = connect(mapStateToProps, mapActionsToProps)(Feed);

export default FeedConnected;
