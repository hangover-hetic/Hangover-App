import React from 'react';
import {Dimensions} from 'react-native';
import {Text} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {Image} from 'react-native';
import {View} from 'react-native';
import {appUrl} from '../api/client';
import InterTitle from './semantics/InterTitle';
import Paragraph from './semantics/Paragraph';
import TextDate from './semantics/TextDate';

class CardFestival extends React.Component {
    constructor(props) {
        super(props);
        let {width} = Dimensions.get('window')
        this.state = {
            width : width
        }
    }

    getStyle() {
        return {
            card: {
                position: 'relative',
                width: this.state.width * 0.8,
                height: 500,
                marginRight: 15
            },
            image: {
                height: '100%',
                width: '100%',
                borderRadius: 10,
            },
            date: {
                position: 'absolute',
                right: 10,
                top: 10,
                height: 55,
                width: 50,
                paddingTop: 1,
                paddingBottom: 1,
                backgroundColor: '#ffffff',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ffffff',
                justifyContent: 'center',
            },
            textDate: {
                fontFamily: 'Poppins-SemiBold',

                textAlign: 'center',
            },
            information: {
                backgroundColor: 'rgba(0,0,0,0.45)',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 10
            },
        }
    }

    render() {
        const styles = this.getStyle();
        const imageUrl = this.props.festival.cover ? appUrl.concat(this.props.festival.cover.contentUrl) : 'https://renonvstakeinfo.org/wp-content/uploads/2019/07/nocontentyet.jpg';

        return <>
            <View style={styles.card}>
                <Image source={{uri: imageUrl}} style={styles.image}/>
                <TouchableHighlight style={styles.date}>
                    <TextDate style={styles.textDate} content={this.props.festival.startDate} />
                </TouchableHighlight>
                <View style={styles.information}>
                    <InterTitle content={this.props.festival.name}/>
                    <Paragraph content={this.props.festival.location}/>
                </View>
            </View>
        </>;
    }
}

export default CardFestival;
