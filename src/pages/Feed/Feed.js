import React from 'react';
import { connect } from 'react-redux';
import { RefreshControl, Vibration, View } from 'react-native';
import Toast from 'react-native-root-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchFestival, fetchFestivalPosts } from '~/redux/Festival/festival-async-actions';
import Title from '~/components/semantics/Title';
import SectionTitle from '~/components/semantics/SectionTitle';
import PostContainer from '~/components/feed/PostContainer';
import { listenMercureTopics } from '~/services/mercure';
import Paragraph from '~/components/semantics/Paragraph';
import { addActualFestivalPosts } from '~/redux/Festival/festival-actions';
import ScrollContainer from '~/components/ui/ScrollContainer';
import { ADD_POST_ROUTE } from './routes';

class Feed extends React.Component {
  mercureInit = false;

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.actualFestival !== null && !this.mercureInit) {
      const { actualFestival, mercureToken } = this.props;

      listenMercureTopics(
        [actualFestival.mercureFeedTopics],
        mercureToken,
        this.onNewPost.bind(this)
      );
      this.mercureInit = true;
      console.log('mercure init');
    }
  }

  componentDidMount() {
    this.loadData();
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
      <ScrollContainer
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={this.onRefresh.bind(this)} />
        }
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Title content="Feed" />
          <Ionicons
            name="add-circle"
            color="white"
            size={30}
            onPress={this.navigateToAddPost.bind(this)}
          />
        </View>

        {actualFestival === null || actualUser === null ? (
          <Paragraph content="loading" />
        ) : (
          <>
            <SectionTitle content={actualFestival.name} />
            {posts.map((post, i) => {
              return (
                <PostContainer
                  userName={`${post.relatedUser.firstName} ${post.relatedUser.lastName}`}
                  userProfilePicture={post.relatedUser?.profilePicture?.contentUrl}
                  key={'post-' + i + post.createdAt}
                  postImage={post.media.contentUrl}
                  postCreatedAt={post.createdAt}
                />
              );
            })}
          </>
        )}
      </ScrollContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  mercureToken: state.user.mercureToken,
  posts: state.festival.actualFeed,
  actualUser: state.user.actualUser,
  actualFestival: state.festival.actualFestival,
});

const mapActionsToProps = {
  fetchFestivalPosts,
  fetchFestival,
  addActualFestivalPosts,
};

const FeedConnected = connect(mapStateToProps, mapActionsToProps)(Feed);

export default FeedConnected;
