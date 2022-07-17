import React from 'react';
import { Marker } from 'react-native-maps';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import Paragraph from '../semantics/Paragraph';

export default class CustomMarker extends React.Component {
  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    iconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  styleIcons = { width: 30, height: 30, borderRadius: 50 };

  shouldComponentUpdate(nextProps) {
    return nextProps.latitude !== this.props.latitude;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.iconSource !== this.props.iconSource) {
      this.setState({
        isMounted: true,
      });
    }
  }

  render() {
    const { latitude, longitude, iconSource, label } = this.props;
    const { isMounted } = this.state;
    return (
      <Marker coordinate={{ latitude, longitude }} tracksViewChanges={!isMounted}>
        <View style={{ alignItems: 'center' }}>
          <Paragraph content={label} styles={{ marginBottom: 5 }} />
          <Image source={iconSource} style={this.styleIcons} />
        </View>
      </Marker>
    );
  }
}
