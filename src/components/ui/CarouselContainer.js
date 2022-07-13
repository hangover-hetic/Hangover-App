import React from 'react';
import { Dimensions, View } from 'react-native';
import { Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';

class CarouselContainer extends React.Component {
  constructor(props) {
    super(props);
    let { width } = Dimensions.get('window');
    this.state = {
      width: width,
      translate: new Animated.Value(0),
    };
  }

  render() {
    const SLIDER_WIDTH = this.state.width - 40; // 40 correspond au padding x
    const ITEM_WIDTH = this.state.width * 0.7;

    return (
      <>
        <View>
          <Carousel
            layout={'default'}
            layoutCardOffset={0}
            data={this.props.items}
            renderItem={this.props.renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            useScrollView={true}
          />
        </View>
      </>
    );
  }
}

export default CarouselContainer;
