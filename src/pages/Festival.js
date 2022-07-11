import React       from 'react'
import { Text, View, Image,StyleSheet, TouchableOpacity,Linking,SafeAreaView, Modal, Pressable   } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { connect } from 'react-redux'
import ScrollContainer from '../components/ui/ScrollContainer';
import Title from '../components/semantics/Title';
import Paragraph from '../components/semantics/Paragraph';
import RadioButton from '../components/RadioButton';
import WhiteSpan from '../components/semantics/WhiteSpan';
import FriendsInscriptionList from '../components/FriendsInscriptionList';
import LineUp from '../components/LineUp';
import { fetchFestival } from '../redux/Festival/festival-async-actions';
import { fetchInscriptionFriends, postInscriptionFestival, fetchInscriptionFestival } from '../redux/User/userAsync-actions';
import dayjs from '../services/dayjs';
import SectionTitle from '../components/semantics/SectionTitle';
import Span from '../components/semantics/Span';
import MenuDrawer from 'react-native-side-drawer';
import { Entypo, Feather,FontAwesome5  } from '@expo/vector-icons';
import TagList from '../components/TagList';




class Festival extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          open: false,
          radioTagSelect: 'Tous',
          modalVisible: false
        };
    }
    

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const { fetchFestival,fetchInscriptionFriends, fetchInscriptionFestival } = this.props;
        try {
          await fetchInscriptionFestival();
          await fetchInscriptionFriends();
          await fetchFestival(2, false);
          
        } catch (e) {
          console.error(e);
        }
        

      }
    async inscriptionFestivalUser(){
      const { postInscriptionFestival, fetchInscriptionFestival } = this.props;
      if(this.props.actualUser.id !== null){
        try {
        await postInscriptionFestival(this.props.festival.id,this.props.actualUser.id);
        await fetchInscriptionFestival();
      } catch (e) {
        console.error(e);
      }
        
      }
    }

    setModalVisible = () => {
      this.setState({ modalVisible: !this.state.modalVisible });
    }
    toggleOpen = () => {
      this.setState({ open: !this.state.open });
    };

    selectStyleTag = (data) => {
      this.setState({radioTagSelect: data})
    }


    lineUpDrawer= (festival, styleTags) => {
      

      return (
        <SafeAreaView style={styles.container}>
        <ScrollContainer style={styles.lineUpDrawer}>
          <TouchableOpacity  style={{marginBottom:10}} onPress={this.toggleOpen}>
            <Entypo name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <Title content="Programmation"/>
          <WhiteSpan content={festival.name + ' ━━━━━ ' + dayjs(festival.startDate).format("DD MMM YYYY")+ ' / ' + dayjs(festival.endDate).format("DD MMM YYYY")}/>
          <RadioButton data={styleTags} bindSelected={this.selectStyleTag}/> 
          
          <LineUp data={festival.shows} selected={this.state.radioTagSelect} direction='column'></LineUp>

        </ScrollContainer>
        </SafeAreaView>
      )
    }

    render() {
        const { actualUser, friendsInscription ,festival, userInscription} = this.props;
        var stylesTags = [];
        var stylesTagsUni = [];
        return (

            <ScrollContainer noPadding={true} >
              { festival === null || userInscription === null ? (
            <Paragraph content="loading" />
            ) : (
              
              <View>
                <View>
                
                    <LinearGradient start={[0, 0.5]}
                            end={[1, 0.5]}
                            colors={['#feac5e', '#c779d0', '#4bc0c8']}
                            style={{alignSelf: 'stretch', height: 230, paddingHorizontal: 20, paddingTop: 50}}>
                    <Image style={styles.cover} source={{
                                    uri: 'https://www.pariszigzag.fr/wp-content/uploads/2019/04/festival-paris-zigzag.jpg',
                                    }}/>
            </LinearGradient>
            <MenuDrawer
                    open={this.state.open}
                    position={'right'}
                    drawerContent={this.lineUpDrawer(festival, stylesTagsUni)}
                    drawerPercentage={100}
                    animationTime={250}
                    overlay={true}
                    opacity={1}
                  >
                    
              </MenuDrawer>
            <LinearGradient start={[0, 0]}
                            end={[0, 1]}
                            colors={['#FFFFFF00', '#202020']}
                            style={{alignSelf: 'stretch', height: 50, marginTop: -50}}>
                    
            </LinearGradient>
            </View>
            
            
              <View style={{paddingHorizontal:20, paddingTop:10}}>
                
                <View>
                  <Title content={festival.name} white={true} />
                  <WhiteSpan content={festival.location}/>
                  <WhiteSpan content={dayjs(festival.startDate).format("DD MMM YYYY")+ ' / ' + dayjs(festival.endDate).format("DD MMM YYYY")}/>
                </View>
                <View style={styles.friendlist}>
                  { friendsInscription === null || friendsInscription === [] ? (
                    <Paragraph content="loading" />
                  ) : (
                    
                    <FriendsInscriptionList data={friendsInscription.filter(item => item.festival.id == festival.id)} />
                  )}
                </View>
                <View>
                  <SectionTitle content="À propos"/>
                  <Span content={festival.description}/>
                </View>
                <View style={styles.lineup}>
                    <View style={{flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <SectionTitle content="Line-up"/>
                  <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
                  <LinearGradient start={[0, 0.5]}
                            end={[1, 0.5]}
                            colors={['#feac5e', '#c779d0', '#4bc0c8']}
                            style={{borderRadius: 25}}>
                      <View style={styles.circleGradient}>
                      <Text style={styles.textButton}>Voir tous les artistes</Text>
                      </View>
                  </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <LineUp data={festival.shows} direction='row'></LineUp>
                  
                </View>
                <View>
                  <SectionTitle content="Ambiance"/>
                  { festival.shows.map((item) => {
                    item.styles.map((style) =>{
                      stylesTags.push(style.label)
                    })
                    
                    
                  })}
                  
                  { [...new Set(stylesTags)].map((item) => {
                    stylesTagsUni.push({value: item});
                  })}
                  <TagList data={stylesTagsUni} /> 
                </View>
                <View>
                  <SectionTitle content="Save the date !"/>
                  
                  {actualUser === null ? (<Paragraph content="loading" />) : (
                    <>
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {               
                          this.setModalVisible();
                        }}
                      >
                        <View style={styles.centeredView}>
                        <LinearGradient start={[0, 0.5]}
                                end={[1, 0.5]}
                                colors={['#feac5e', '#c779d0', '#4bc0c8']}
                                style={{width: '100%', height:3}}>
                          </LinearGradient>
                          <View style={styles.modalView}>
                          
                            <Pressable
                              style={[styles.buttonModal]}
                              onPress={() => {this.inscriptionFestivalUser(festival.id,actualUser.id), this.setModalVisible()}}
                            >
                              <Text style={styles.textModal}>Je participe !</Text>
                            </Pressable>
                            <Pressable
                              style={[styles.buttonModal]}
                              onPress={() => this.setModalVisible()}
                            >
                              <Text style={styles.textModal}>Plus tard</Text>
                            </Pressable>
                          </View>
                        </View>
                    </Modal>
                    {userInscription.filter(inscription => inscription.festival.id === festival.id).length !== 0 ? (<Span content="Vous êtes déjà inscrit"></Span>) : (
                    <TouchableOpacity style={styles.inscriptionButton} onPress={() => this.setModalVisible()}>
                      <Feather name="calendar" size={16} color="#9D9D9D" />
                      <Span style={styles.spanButton} content="Ajouter cet évènement au calendrier"/>
                    </TouchableOpacity>)}
                    
                    </>
                    
                  )}
                  
                  
                </View>
                <View>
                  <SectionTitle content="Billeterie"/>
                  <TouchableOpacity style={styles.inscriptionButton} onPress={() => Linking.openURL(festival.link)}>
                  <FontAwesome5 name="ticket-alt" size={16} color="#9D9D9D" />
                    <Span style={styles.spanButton} content="Accéder à la billeterie de l'évènement"/>
                  </TouchableOpacity>
                </View>
              </View>
              

                
                
              </View>
              )}
            </ScrollContainer>
        );
    }
}
const styles = StyleSheet.create({ 
  container:{
  },
    cover: {
        alignSelf: 'stretch',
        height: 180,
        zIndex: 1
        

    },
    friendlist:{
      marginTop: 20
    },
    lineUpDrawer:{
      elevation:5,
      position: 'absolute',
      width:'100%',
      height: 5000,
    },

    textButton: {
      margin: 2,
      paddingHorizontal: 6,
      textAlign: "center",
      color: 'white',
      fontSize: 12,
      fontFamily: 'Poppins',
    },
    circleGradient: {
      margin: 1,
      backgroundColor: "#202020",
      borderRadius: 25
    },
    inscriptionButton: {
      flex: 1,
      flexDirection: "row",
    },
    spanButton: {
      marginLeft: 8
    },
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      width: '100%',
      backgroundColor: "#202020",
      alignItems: "center",
      alignSelf: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    textModal:{
      color: '#ffffff',
      fontSize: 20,
      fontFamily: 'Poppins-SemiBold',
      textAlign: 'center',
    },
    buttonModal:{
      width: '100%',
      height:70,
      justifyContent: 'center',
      borderBottomWidth:1,
      borderColor: '#9D9D9D'
    }
    
 })
const mapStateToProps = (state) => ({
    actualUser: state.userReducer.actualUser,
    friendsInscription: state.userReducer.userInscriptionFriends,
    userInscription: state.userReducer.userInscription,
    festival: state.festivalReducer.festival,
  });
  const mapActionsToProps = {
    fetchFestival,
    postInscriptionFestival,
    fetchInscriptionFriends,
    fetchInscriptionFestival
  };


  const FestivalConnected = connect(mapStateToProps, mapActionsToProps)(Festival);

export default FestivalConnected;
