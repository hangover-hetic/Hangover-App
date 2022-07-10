import React       from 'react'
import { Text, View, Image,StyleSheet, TouchableOpacity,Linking  } from 'react-native';
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
import { fetchInscriptionFriends } from '../redux/User/userAsync-actions';
import dayjs from '../services/dayjs';
import SectionTitle from '../components/semantics/SectionTitle';
import Span from '../components/semantics/Span';
import MenuDrawer from 'react-native-side-drawer';
import { Entypo, Feather,FontAwesome5  } from '@expo/vector-icons';




class Festival extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          open: false
        };
    }
    

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const { fetchFestival,fetchInscriptionFriends } = this.props;
        try {
          await fetchInscriptionFriends();
          await fetchFestival(3, false);
        } catch (e) {
          console.error(e);
        }
        

      }

    toggleOpen = () => {
      this.setState({ open: !this.state.open });
    };

    lineUpDrawer= (festival) => {
      
      const data = [
        { value: 'Tous les artistes'},
        { value: 'Rock' },
        { value: 'Rap' },
        { value: 'Pop indé' },
        
      ];
      return (
        <ScrollContainer style={styles.lineUpDrawer}>
          <TouchableOpacity  style={{marginBottom:10}} onPress={this.toggleOpen}>
            <Entypo name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <Title content="Programmation"/>
          <WhiteSpan content={festival.name + ' ━━━━━ ' + dayjs(festival.startDate).format("DD MMM YYYY")+ ' / ' + dayjs(festival.endDate).format("DD MMM YYYY")}/>
          <RadioButton data={data} onSelect={1} /> 
          
          <LineUp data={festival.shows} direction='column'></LineUp>

        </ScrollContainer>
      )
    }

    render() {
        const { actualUser, friendsInscription ,festival } = this.props;
        var stylesTags = [];
        return (

            <ScrollContainer noPadding={true}>
              { festival === null  ? (
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
                    drawerContent={this.lineUpDrawer(festival)}
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
                      stylesTags.push({value: style})
                    })
                    
                  })}
                  <RadioButton data={stylesTags} unSelectable /> 
                </View>
                <View>
                  <SectionTitle content="Save the date !"/>
                  <TouchableOpacity style={styles.inscriptionButton}>
                    <Feather name="calendar" size={16} color="#9D9D9D" />
                    <Span style={styles.spanButton} content="Ajouter cet évènement au calendrier"/>
                  </TouchableOpacity>
                  
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
    cover: {
        alignSelf: 'stretch',
        height: 180,
        zIndex: 1
        

    },
    friendlist:{
      marginTop: 20
    },
    lineUpDrawer:{
      position: 'absolute',
      height: 5000
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
    
 })
const mapStateToProps = (state) => ({
    actualUser: state.userReducer.actualUser,
    friendsInscription: state.userReducer.userInscriptionFriends,
    festival: state.festivalReducer.festival,
  });
  const mapActionsToProps = {
    fetchFestival,
    fetchInscriptionFriends,
  };


  const FestivalConnected = connect(mapStateToProps, mapActionsToProps)(Festival);

export default FestivalConnected;
