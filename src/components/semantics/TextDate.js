import moment from 'moment';
import React from 'react';
import { Text } from 'react-native';

class TextDate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const date = moment(this.props.content).locale('fr').format('ll');

    return (
      <>
        <Text>{date}</Text>
      </>
    );
  }
}

export default TextDate;
