import { LinearGradient } from 'expo-linear-gradient';
import { React, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import WhiteSpan from '../components/semantics/WhiteSpan';
import dayjs from '../services/dayjs';
import { getAbsoluteMediaPath } from '../services/media';

export default function LineUp({ data, direction, selected }) {
  var prog = data;
  if (direction === 'row') {
    const linup = data.slice(0, 3);

    return (
      <View style={styles.viewRow}>
        {linup.map((item, i) => {
          return (
            <View style={{ width: '31%' }} key={'lineup-' + i + '-' + item.name + '-row'}>
              {item.image === null ? (
                <View>
                  <LinearGradient
                    start={[0, 0.5]}
                    end={[5, 0.5]}
                    colors={['#feac5e', '#c779d0', '#4bc0c8']}
                    style={{ width: '100%', aspectRatio: 1 }}
                  >
                    <LinearGradient
                      start={[0, 0.6]}
                      end={[0, 1]}
                      colors={['#FFFFFF00', '#202020']}
                      style={{
                        alignSelf: 'stretch',
                        height: 60,
                        zIndex: 3,
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}
                    >
                      <WhiteSpan style={styles.username} content={item.name} />
                    </LinearGradient>
                  </LinearGradient>
                </View>
              ) : (
                <View>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: getAbsoluteMediaPath(item.image.contentUrl),
                    }}
                  />

                  <LinearGradient
                    start={[0, 0]}
                    end={[0, 1.1]}
                    colors={['#FFFFFF00', '#202020']}
                    style={{
                      alignSelf: 'stretch',
                      height: 60,
                      elevation: 1,
                      marginTop: -60,
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <WhiteSpan style={styles.username} content={item.name} />
                  </LinearGradient>
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  } else if (direction === 'column') {
    if (selected !== 'Tous') {
      prog = data.filter((lineup) => lineup.styles.some((e) => e.label === selected));
    } else {
      prog = data;
    }
    return (
      <ScrollView
        style={{}}
        contentContainerStyle={styles.viewColumn}
        showsVerticalScrollIndicator={false}
      >
        {prog.map((item, i) => {
          return (
            <View style={styles.show} key={'lineup-' + i + '-' + item.name + '-col'}>
              {item.image === null ? (
                <View>
                  <LinearGradient
                    start={[0, 0.5]}
                    end={[5, 0.5]}
                    colors={['#feac5e', '#c779d0', '#4bc0c8']}
                    style={{ width: '100%', aspectRatio: 1 }}
                  >
                    <LinearGradient
                      start={[0, 0.6]}
                      end={[0, 1]}
                      colors={['#FFFFFF00', '#202020']}
                      style={{
                        alignSelf: 'stretch',
                        height: 60,
                        zIndex: 3,
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}
                    >
                      <WhiteSpan
                        style={styles.usernameColumn}
                        content={item.name + ' ━━ ' + dayjs(item.startTime).format('ddd DD HH:mm')}
                      />
                    </LinearGradient>
                  </LinearGradient>
                </View>
              ) : (
                <View>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: getAbsoluteMediaPath(item.image.contentUrl),
                    }}
                  />
                  <LinearGradient
                    start={[0, 0]}
                    end={[0, 0.9]}
                    colors={['#FFFFFF00', '#202020']}
                    style={{
                      alignSelf: 'stretch',
                      height: 60,
                      zIndex: 15,
                      justifyContent: 'flex-end',
                      marginTop: -60,
                    }}
                  >
                    <WhiteSpan
                      style={styles.usernameColumn}
                      content={item.name + ' ━━ ' + dayjs(item.startTime).format('ddd DD HH:mm')}
                    />
                  </LinearGradient>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  avatar: {
    width: '100%',
    aspectRatio: 1,
  },
  show: {
    width: '47%',
    aspectRatio: 1,
    marginTop: 20,
  },
  username: {
    alignSelf: 'flex-end',
    marginBottom: 7,
    marginEnd: 5,
  },
  usernameColumn: {
    alignSelf: 'flex-end',
    marginBottom: 7,
    marginEnd: 5,
    fontSize: 10,
  },
});
