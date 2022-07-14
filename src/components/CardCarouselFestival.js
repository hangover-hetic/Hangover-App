import { Image, TouchableHighlight, View, StyleSheet } from 'react-native';
import TextDate from './semantics/TextDate';
import InterTitle from './semantics/InterTitle';
import Paragraph from './semantics/Paragraph';
import React from 'react';
import config from '../services/config';

const CardCarouselFestival = ({ item, index }) => {
  const appUrl = config.request.baseURL;
  const imageUrl = item.cover
    ? appUrl.concat(item.cover.contentUrl)
    : 'https://renonvstakeinfo.org/wp-content/uploads/2019/07/nocontentyet.jpg';

  return (
    <View style={styles.card} key={index}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <TouchableHighlight style={styles.date}>
        <TextDate style={styles.textDate} content={item.startDate} />
      </TouchableHighlight>
      <View style={styles.information}>
        <InterTitle content={item.name} />
        <Paragraph content={item.location} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: '100%',
    height: 400,
    marginRight: 15,
    borderRadius: 10,
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
    padding: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});

export default CardCarouselFestival;
