import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

class Paragraph extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    styles: PropTypes.object,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { content, styles } = this.props;
    return <Text style={[baseStyles.text, styles]}>{content}</Text>;
  }
}

const baseStyles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.5,
    fontFamily: 'Poppins',
  },
});

export default Paragraph;
