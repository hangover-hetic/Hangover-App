import React       from 'react'
import { Text, View, Image,StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { connect } from 'react-redux'
import ScrollContainer from '../components/ui/ScrollContainer';
import Title from '../components/semantics/Title';
import WhiteSpan from '../components/semantics/WhiteSpan';
import { fetchFestival } from '../redux/Festival/festival-async-actions';
import dayjs from '../services/dayjs';




class Festival extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.loadData();
        console.log(this.props);
    
    }
    async loadData() {
        const { fetchFestival } = this.props;
        try {
          await fetchFestival(2, false);
        } catch (e) {
          console.error(e);
        }

      }

    render() {
        const { actualUser, festival } = this.props;
        return (

            <ScrollContainer noPadding={true}>
                <View>
                    <LinearGradient start={[0, 0.5]}
                            end={[1, 0.5]}
                            colors={['#feac5e', '#c779d0', '#4bc0c8']}
                            style={{alignSelf: 'stretch', height: 230, paddingHorizontal: 20, paddingTop: 50,zIndex: 1}}>
                    <Image style={styles.cover} source={{
                                    uri: 'https://www.pariszigzag.fr/wp-content/uploads/2019/04/festival-paris-zigzag.jpg',
                                    }}/>
            </LinearGradient>
            <LinearGradient start={[0, 0]}
                            end={[0, 1]}
                            colors={['#FFFFFF00', '#202020']}
                            style={{alignSelf: 'stretch', height: 50, marginTop: -50, zIndex: 2}}>
                    
            </LinearGradient>
            </View>
            <View>
                <Title content={festival.name} white={true} />
                <WhiteSpan content={festival.location}/>
                <WhiteSpan content={new Date(festival.startDate) + ' ' + new Date(festival.endDate)}/>
            </View>
            </ScrollContainer>
        );
    }
}
const styles = StyleSheet.create({ 
    cover: {
        alignSelf: 'stretch',
        height: 180,
        zIndex: 3
        

    },
    
 })
const mapStateToProps = (state) => ({
    actualUser: state.userReducer.actualUser,
    festival: state.festivalReducer.festival,
  });
  const mapActionsToProps = {
    fetchFestival,
  };


  const FestivalConnected = connect(mapStateToProps, mapActionsToProps)(Festival);

export default FestivalConnected;
