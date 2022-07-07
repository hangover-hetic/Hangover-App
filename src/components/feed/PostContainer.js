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
    festivalName: PropTypes.string,
    postImage: PropTypes.string.isRequired,
    postCreatedAt : PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { userName, festivalName, userProfilePicture, postImage, postCreatedAt } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: getAbsoluteMediaPath(userProfilePicture) }}
                 style={{ width: 30, height: 30, marginRight: 10, borderRadius: 20 }} />
          <Paragraph content={`${userName} - ${festivalName}`} />
        </View>
        <Image source={{ uri: getAbsoluteMediaPath(postImage) }}
               style={{ width: 300, height: 300, marginTop: 10 }} />
        <Paragraph content={dayjs(postCreatedAt).toNow()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    color: '#fff',
    padding: 20,
    paddingTop: 50,
  },
});

export default PostContainer;
