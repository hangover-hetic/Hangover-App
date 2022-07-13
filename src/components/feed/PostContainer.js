import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import Paragraph from '../semantics/Paragraph';
import { getAbsoluteMediaPath } from '../../services/media';
import dayjs from '../../services/dayjs';
import Span from '../semantics/Span';
import { AntDesign } from '@expo/vector-icons';

class PostContainer extends React.Component {
  static propTypes = {
    userProfilePicture: PropTypes.string,
    userName: PropTypes.string,
    postImage: PropTypes.string.isRequired,
    postCreatedAt: PropTypes.string.isRequired,
    message: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { userName, userProfilePicture, postImage, postCreatedAt, message } = this.props;
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
        {message && <Paragraph content={message} />}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="clockcircleo" size={15} color="#9D9D9D" />
          <Span content={dayjs(postCreatedAt).fromNow()} style={{ marginLeft: 6 }} />
        </View>
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
