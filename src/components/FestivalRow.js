import { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Pressable, View } from 'react-native';
import Paragraph from './semantics/Paragraph';
import BigSpan from './semantics/BigSpan';

class FestivalRow extends Component {
  static propTypes = {
    cover: PropTypes.string,
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
  };

  render() {
    const { cover, name, onPress, id, year } = this.props;
    console.log(cover);
    return (
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          paddingBottom: 5,
        }}
        onPress={() => onPress(id)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {cover ? (
            <Image source={{ uri: cover }} style={{ width: 70, height: 70, borderRadius: 10 }} />
          ) : (
            <View style={{ width: 70, height: 70, backgroundColor: 'grey', borderRadius: 10 }} />
          )}

          <Paragraph content={name} styles={{ marginLeft: 10 }} />
        </View>

        <BigSpan content={year} styles={{ marginLeft: 'auto' }} />
      </Pressable>
    );
  }
}

export default FestivalRow;
