import Title from '../../../components/semantics/Title';
import SectionTitle from '../../../components/semantics/SectionTitle';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchFriends } from '../../../redux/User/userAsync-actions';
import { Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import BigSpan from '../../../components/semantics/BigSpan';
import Span from '../../../components/semantics/Span';
import { getProfilePicture } from '../../../services/media';
import { ABOUT, TERMS_OF_USE, UPDATE_ACCOUNT } from './routes';
import ScrollContainer from '../../../components/ui/ScrollContainer';
import { userLogout } from '../../../redux/User/userActions';

class Params extends React.Component {
  constructor(props) {
    super(props);
  }

  navigateUpdateAccount() {
    const { navigation } = this.props;
    navigation.navigate(UPDATE_ACCOUNT);
  }

  navigateTermsOfUSe(){
    const { navigation } = this.props;
    navigation.navigate(TERMS_OF_USE);
  }

  navigateAbout(){
    const { navigation } = this.props;
    navigation.navigate(ABOUT);
  }

  render() {
    const { actualUser, userLogout } = this.props;
    const grey = '#9D9D9D';

    return (
      <>
        <ScrollContainer style={{ paddingTop: 80 }}>
          <Title content={'Paramètres'} />
          <SectionTitle content={'Mes informations'} />

          <View>
            <TouchableHighlight
              style={styles.listItem}
              onPress={this.navigateUpdateAccount.bind(this)}
            >
              <View style={styles.listContent}>
                <Image
                  style={styles.profilePicture}
                  source={{ uri: getProfilePicture(actualUser.profilePicture) }}
                />
                <View>
                  <BigSpan content={actualUser.firstName + ' ' + actualUser.lastName} />
                  <Span content={actualUser.email} />
                </View>
                <MaterialIcons
                  style={styles.arrow}
                  name={'arrow-forward-ios'}
                  color={grey}
                  size={15}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.listItem}>
              <View style={styles.listContent}>
                <Entypo style={styles.listIcon} name={'lock-open'} color={grey} size={25} />
                <BigSpan content={'Confidentialité'} />
                <MaterialIcons
                  style={styles.arrow}
                  name={'arrow-forward-ios'}
                  color={grey}
                  size={15}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.listItem}>
              <View style={styles.listContent}>
                <Entypo style={styles.listIcon} name={'lifebuoy'} color={grey} size={25} />
                <BigSpan content={"Besoin d'aide "} />
                <MaterialIcons
                  style={styles.arrow}
                  name={'arrow-forward-ios'}
                  color={grey}
                  size={15}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight 
              onPress={this.navigateTermsOfUSe.bind(this)}
              style={styles.listItem}
            >
              <View style={styles.listContent}>
                <FontAwesome5 style={styles.listIcon} name={'book-open'} color={grey} size={25} />
                <BigSpan content={"Conditions d'utilisation"} />
                <MaterialIcons
                  style={styles.arrow}
                  name={'arrow-forward-ios'}
                  color={grey}
                  size={15}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight 
              style={styles.listItem}
              onPress={this.navigateAbout.bind(this)}
            >
              <View style={styles.listContent}>
                <Entypo style={styles.listIcon} name={'info-with-circle'} color={grey} size={25} />
                <BigSpan content={'À propos'} />
                <MaterialIcons
                  style={styles.arrow}
                  name={'arrow-forward-ios'}
                  color={grey}
                  size={15}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.listItemWithoutBorder} onPress={() => userLogout()}>
              <View style={styles.listContent}>
                <MaterialIcons style={styles.listIcon} name={'logout'} color={grey} size={25} />
                <BigSpan content={'Déconnexion'} />
                <MaterialIcons
                  style={styles.arrow}
                  name={'arrow-forward-ios'}
                  color={grey}
                  size={15}
                />
              </View>
            </TouchableHighlight>
          </View>
        </ScrollContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backArrow: {
    width: 80,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 10,
  },
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#3D3D3D',
  },
  listItemWithoutBorder: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  listIcon: {
    marginRight: 10,
  },
  listContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    marginLeft: 'auto',
  },
});

const mapStateToProps = (state) => ({
  actualUser: state.user.actualUser,
});
const mapActionsToProps = {
  fetchFriends,
  userLogout,
};

const ParamsConnected = connect(mapStateToProps, mapActionsToProps)(Params);

export default ParamsConnected;
