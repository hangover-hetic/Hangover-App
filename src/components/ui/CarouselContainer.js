import React from 'react';
import {Dimensions, View} from 'react-native';
import { Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel'

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
    const SLIDER_WIDTH = this.state.width - 40 // 40 correspond au padding x
    const ITEM_WIDTH = this.state.width * 0.7
    var data = [];

    if(this.props.userInscription){
      this.props.items.map((item) =>{
        data.push({
          cover: item.festival.cover,
          startDate: item.startDate,
          name: item.festival.name,
          location: item.festival.location
        })
      })
    } else {
      data = this.props.items;
    }
    return (
      <>
        <View>
          <Carousel
              layout={'default'}
              layoutCardOffset={0}
              data={data}
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
