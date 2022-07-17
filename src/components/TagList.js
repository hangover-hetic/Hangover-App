import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { React, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';

export default function TagList({ data }) {
  return (
    <ScrollView
      style={styles.view}
      contentContainerStyle={{ flexDirection: 'row' }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {data.map((item, index) => {
        return (
          <Pressable style={styles.tag} key={'tag-' + index}>
            {/* add style here */}

            <LinearGradient
              start={[0, 0.5]}
              end={[1, 0.5]}
              colors={['#858585', '#858585']}
              style={{ borderRadius: 25 }}
            >
              <View style={styles.background}>
                <Text style={styles.tagText}>{item.value}</Text>
              </View>
            </LinearGradient>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  background: {
    margin: 1,
    backgroundColor: '#202020',
    borderRadius: 25,
  },
  tagText: {
    margin: 2,
    paddingHorizontal: 6,
    textAlign: 'center',
    color: '#858585',
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  tag: {
    alignSelf: 'flex-start',
    marginHorizontal: 4,
  },
});
