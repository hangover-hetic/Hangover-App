import {LinearGradient} from 'expo-linear-gradient';
import {React, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Image } from 'react-native';
import WhiteSpan from '../components/semantics/WhiteSpan';
import dayjs from '../services/dayjs';


export default function LineUp({ data, direction }) {
    if(direction === 'row'){
        const linup = data.slice(0,3)
        
        return(
            <View style={styles.viewRow}>
              {linup.map((item) => {
        
                return (
                    <View style={{width: '31%'}}>
                        {item.image === null ? (
                            <View>
                            <LinearGradient start={[0, 0.5]}
                                end={[5, 0.5]}
                                colors={['#feac5e', '#c779d0', '#4bc0c8']}
                                style={{width: '100%', aspectRatio: 1}}>
                                    <LinearGradient start={[0, 0.6]}
                            end={[0, 1]}
                            colors={['#FFFFFF00', '#202020']}
                            style={{alignSelf: 'stretch', height: 60, zIndex: 3, flex:1,justifyContent:'flex-end'}}>
                                <WhiteSpan style={styles.username} content={item.name}/>
                            </LinearGradient>
                            
                            </LinearGradient>
                            
                            
                        </View>
                        ) 
                            
                        :(
                            <View>
                                <Image style={styles.avatar} source={{
                                    uri: item.image,
                                    }}/>
                                <LinearGradient start={[0, 0]}
                                end={[0, 1.3]}
                                colors={['#FFFFFF00', '#202020']}
                                style={{alignSelf: 'stretch', height: 60, zIndex: 3,marginTop:-60, flex:1,justifyContent:'flex-end'}}>
                                    <WhiteSpan style={styles.username} content={item.name}/>
                                </LinearGradient>
                                
                            </View>
                        )}
                        
                    </View>
                )
            })}
            </View>
        )
    } else if(direction === 'column'){
        return(
            <View style={styles.viewColumn}>
              {data.map((item) => {
        
                return (
                    <View style={styles.show}>
                        {item.image === null ? (
                            <View>
                            <LinearGradient start={[0, 0.5]}
                                end={[5, 0.5]}
                                colors={['#feac5e', '#c779d0', '#4bc0c8']}
                                style={{width: '100%', aspectRatio: 1,}}>
                                    <LinearGradient start={[0, 0.6]}
                            end={[0, 1]}
                            colors={['#FFFFFF00', '#202020']}
                            style={{alignSelf: 'stretch', height: 60, zIndex: 3, flex:1,justifyContent:'flex-end'}}>
                                <WhiteSpan style={styles.usernameColumn} content={item.name + ' ━━ ' + dayjs(item.startTime).format("ddd DD HH:mm")}/>
                            </LinearGradient>
                            
                            </LinearGradient>
                            
                            
                        </View>
                        ) 
                            
                        :(
                            <View style={styles.show}>
                                <Image style={styles.avatar} source={{
                                    uri: item.image,
                                    }}/>
                                <LinearGradient start={[0, 0]}
                            end={[0, 0.9]}
                            colors={['#FFFFFF00', '#202020']}
                            style={{alignSelf: 'stretch', height: 60, zIndex: 3,marginTop:-60}}>
                    
                            </LinearGradient>
                                <WhiteSpan style={styles.username} content={item.name + ' ━━━ ' + dayjs(item.startDate).format("DD/MM HHhmm")}/>
                            </View>
                        )}
                        
                    </View>
                )
            })}
            </View>
        )
    }
   
}

const styles = StyleSheet.create({
    viewRow: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewColumn: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap:'wrap',
    },
    avatar: {
        width: '100%',
        aspectRatio: 1,
    },
    show: {
        width: '47%',
        aspectRatio: 1,
        marginTop: 20
    },
    username: {
        alignSelf:'flex-end',
        marginBottom: 7,
        marginEnd: 5
    },
    usernameColumn: {
        alignSelf:'flex-end',
        marginBottom: 7,
        marginEnd: 5,
        fontSize: 10
    },
  });