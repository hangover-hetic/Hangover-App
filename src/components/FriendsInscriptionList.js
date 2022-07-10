import {LinearGradient} from 'expo-linear-gradient';
import {React, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Span from '../components/semantics/Span';


export default function FriendsInscriptionList({ data }) {
    return(
        <View>
                {data.length === 1 ? (
                    <View  style={styles.view}>
                        <Image style={styles.avatar} source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}/>
                        <Span styles={styles.text} content={ data[0].relatedUser.firstName + ' participe !' }/>
                    </View>
                ) : null}
                {data.length === 2 ? (
                    <View style={styles.view}>
                        <Image style={styles.avatar} source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}/>
                        <Image style={styles.avatarSecond} source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}/>
                        <Span styles={styles.text} content={ data[0].relatedUser.firstName + ' et '+ data[1].relatedUser.firstName + ' participent !' }/>
                    </View>
                ) : null}
                {data.length > 2 ? (
                    <View style={styles.view}>
                        <Image style={styles.avatar} source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}/>
                        <Image style={styles.avatarSecond} source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}/>
                        <LinearGradient start={[0, 0.5]}
                            end={[1, 0.5]}
                            colors={['#feac5e', '#c779d0', '#4bc0c8']}
                            style={{borderRadius: 25, width: 40, height: 40, marginLeft: -20,}}>
                            <View style={styles.circleGradient}>
                            <Text style={styles.more}>+{data.length - 2 }</Text>
                            </View>
                        </LinearGradient>
                        <Span styles={styles.text} content={ data[0].relatedUser.firstName + ', '+ data[1].relatedUser.firstName + ' et '+ (data.length-2) +' autre(s) ami(s) participent !' }/>
                    </View>
                ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    view:{  
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 45,
    },
    circleGradient: {
        margin: 1,
        backgroundColor: "#202020",
        borderRadius: 25,
        width: 38,
        height: 38,
        justifyContent: 'center',
        flex:1,
        
    },
    avatar: {
        width: 40,
        height: 40, 
        borderRadius: 25,
    },
    avatarSecond: {
        width: 40,
        height: 40,
        marginLeft: -20,
        borderRadius: 25,
    },
    more: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        marginTop: -2  
    },
    text: {
        marginLeft: 10,
        flex:1,
        flexWrap: 'wrap'
    }
    
  });