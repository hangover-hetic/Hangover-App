import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import Paragraph from '../semantics/Paragraph';
import { getAbsoluteMediaPath } from '../../services/media';
import dayjs from '../../services/dayjs';

class PostContainer extends React.Component {
  static propTypes = {
    userProfilePicture: PropTypes.string,
    userName: PropTypes.string,
    postImage: PropTypes.string.isRequired,
    postCreatedAt: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { userName, userProfilePicture, postImage, postCreatedAt } = this.props;
    const profilePicture = userProfilePicture
      ? getAbsoluteMediaPath(userProfilePicture)
      : 'https://doodleipsum.com/500/avatar-5?bg=ceebff&shape=circle';
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: profilePicture }}
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 20, marginBottom: 10 }}
          />
          <Paragraph content={`${userName}`} />
        </View>
        <Image
          source={{ uri: getAbsoluteMediaPath(postImage) }}
          style={{ width: '100%', height: 300, marginTop: 10, marginBottom: 10 }}
        />
        <Paragraph content={dayjs(postCreatedAt).fromNow()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    color: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#3D3D3D',
    borderBottomWidth: 1,
  },
});

export default PostContainer;
