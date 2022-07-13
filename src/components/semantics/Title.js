import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearTextGradient } from 'react-native-text-gradient';
import PropTypes from 'prop-types';

class Title extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  getStyles() {
    return {
      view: {
        height: 50,
        width: this.props.width ? this.props.width : '100%',
      },
      text: {
        fontSize: 32,
        fontFamily: 'Poppins-Bold',
        alignSelf: 'baseline',
      },
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <MaskedView
        style={styles.view}
        maskElement={<Text style={[this.props.style, styles.text]}>{this.props.content}</Text>}
      >
        <LinearGradient
          colors={['#feac5e', '#c779d0', '#4bc0c8']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.5, 1]}
          style={{ flex: 1 }}
        />
      </MaskedView>
    );
  }
}

export default Title;
