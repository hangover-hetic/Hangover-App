import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class PostContainer extends React.Component {
  static propTypes = {
    userProfilePicture: PropTypes.string,
    userName: PropTypes.string,
    festivalName: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={styles.container}>{this.props.children}</View>
      </>
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
