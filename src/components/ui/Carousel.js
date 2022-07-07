import React from 'react';
import {Dimensions} from 'react-native';
import {Animated} from 'react-native';
import {PanResponder} from 'react-native';
import CardFestival from '../CardFestival';

class Carousel extends React.Component {

    constructor(props) {
        super(props);
        let {width} = Dimensions.get('window');
        this.state = {
            width: width,
            translate: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 7,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            // onPanResponderMove: Animated.event([null, {dx: this.state.translate}], {useNativeDriver: false}),
            onPanResponderMove: (evt, gestureState) => this.state.translate.setValue(gestureState.dx),
            onPanResponderRelease: (evt, gestureState) => {
                Animated.timing(this.state.translate, {duration: 300, toValue: 0, useNativeDriver: true}).start();
            },
            onPanResponderTerminate: (evt, gestureState) => this.endGesture.bind(this),
            onShouldBlockNativeResponder: (evt, gestureState) => true,
        });
    }

    endGesture(evt, gestureState) {
        let toValue = 0;
        if (Math.abs(gestureState.dx) / this.state.width > 0.2) {
            if (gestureState.dx) {
                toValue = this.state.width * -1;
            } else {
                toValue = this.state.width;
            }
        }

        Animated.timing(this.state.translate,
            {duration: 300, toValue: toValue, useNativeDriver: true},
        ).start();
    }

    getStyle() {
        return {
            container: {
                display: 'flex',
                width: this.props.items.length * (this.state.width * 0.8),
                flexDirection: 'row',
                transform: [{translateX: this.state.translate}],

            },
        };
    }

    render() {
        const styles = this.getStyle();

        return <>
            <Animated.View style={styles.container}>
                {
                    this.props.items.map((item, index) => {
                        return (
                            <CardFestival key={index} festival={item}/>
                        );
                    })
                }
            </Animated.View>
        </>;
    }
}

export default Carousel;
