import * as React from 'react';
import { View, useWindowDimensions, ScrollView, Text, StyleSheet, Image, Pressable, } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { AntDesign, Feather } from '@expo/vector-icons';
import {getAbsoluteMediaPath} from '../services/media';



export default function TabViewExample({ data, bindAcceptInvitation,bindDeletedInvitation }) {
    
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const heightTab1 = data.filter(friendship => friendship.validated).length * 60;
  const heightTab2 = data.filter(friendship => !friendship.validated).length * 60;
  const [routes] = React.useState([
    { key: 'first', title: 'Liste d\'amis' },
    { key: 'second', title: 'Invitations' },
  ]);
  const TAB_HEIGHT = 48;
  const TAB_BAR_HEIGHT = 70;

  const FirstRoute = () => (
    <View style={{ flex: 1 }}>
        
        { data.filter(friendship => friendship.validated).map((friendship) => {
            
            
            return (
                <View style={styles.itemList}>
                  <View style={styles.itemListContent}>
                    {friendship.user.profilePicture !== null ? (
                        <Image
                        style={styles.avatar}
                        source={{
                          uri: getAbsoluteMediaPath(friendship.user.profilePicture),
                        }}
                      />
                    ) : (
                        <Image
                      style={styles.avatar}
                      source={{
                        uri: 'https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg',
                      }}
                    />
                    )}
                    
                    <Text style={styles.username}>
                      @{friendship.user.firstName} {friendship.user.lastName}
                    </Text>
                  </View>
                  <Feather
                    style={styles.icons}
                    name="map-pin"
                    size={22}
                    color="white"
                  />
                  <AntDesign style={styles.icons} name="deleteuser" size={26} color="#ff4848" />
                </View>
              );
        } )}
    </View>
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1 }}>
        
        { data.filter(friendship => !friendship.validated).map((friendship) => {
            
            
            return (
                <View style={styles.itemList}>
                  <View style={styles.itemListContent}>
                  {friendship.user.profilePicture !== null ? (
                        <Image
                        style={styles.avatar}
                        source={{
                          uri: getAbsoluteMediaPath(friendship.user.profilePicture),
                        }}
                      />
                    ) : (
                        <Image
                      style={styles.avatar}
                      source={{
                        uri: 'https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg',
                      }}
                    />
                    )}
                    <Text style={styles.username}>
                      @{friendship.user.firstName} {friendship.user.lastName}
                    </Text>
                  </View>
                  <Pressable onPress={() => bindAcceptInvitation(friendship.friendshipId)}>
                    <AntDesign style={styles.icons} name="checkcircleo" size={27} color="#8cd46c" />
                  </Pressable>
                  <Pressable onPress={() => bindDeletedInvitation(friendship.friendshipId)}>
                  <AntDesign style={styles.icons} name="closecircleo" size={27} color="#ff4848" />
                  </Pressable>
                  
                  
                </View>
              );
        } )}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  
  return (
    <ScrollView style={{ }}>
        <View style={{ flex: 1 }}>
    <TabView
    style={{
        height: heightTab1 >= heightTab2 ? heightTab1+TAB_HEIGHT+TAB_BAR_HEIGHT : heightTab2+TAB_HEIGHT+TAB_BAR_HEIGHT,
      }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props =>
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'transparent' }}
            tabStyle={{ height: TAB_BAR_HEIGHT,marginTop: 20 }} // here
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color, margin: 8, fontFamily: 'Poppins-SemiBold', fontSize: 18 }}>
                    {route.title}
                </Text>
            )}/>
      }
    />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
    itemList: {
      flexDirection: 'row',
      borderBottomWidth: 0.2,
      borderColor: '#9d9d9d',
      height: 60,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 5,
    },
    itemListContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
    },
  
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 63,
      borderWidth: 2,
      borderColor: '#FFFFFF',
    },
    username: {
      color: 'white',
      marginLeft: 10,
      fontFamily: 'Poppins-SemiBold',
    },

    icons: {
        marginHorizontal:2
    }
  });