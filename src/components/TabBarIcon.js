import { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class TabBarIcon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    active: PropTypes.bool,
    color: PropTypes.string.isRequired,
  };

  static defaultProps = {
    active: false,
  };

  render() {
    const { name, size, active, color } = this.props;
    return (
      <View style={{ paddingBottom: active ? 10 : 0, alignItems: 'center' }}>
        <MaterialIcons name={name} size={size} color={color} />
        <View
          style={{
            width: active ? 5 : 0,
            height: active ? 5 : 0,
            borderRadius: 10,
            backgroundColor: '#4BC0C8',
            position: 'absolute',
            bottom: 2,
          }}
        />
      </View>
    );
  }
}

export default TabBarIcon;
