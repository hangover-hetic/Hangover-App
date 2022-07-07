import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import Container from '../components/ui/Container';


class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container>
        <Text style={{color:"white"}}>Je suis la page d'index de jessy</Text>
        </Container>
    );
  }
}

const mapStateToProps = (state) => ({
    userToken : state.user.userToken
})


const HomepageConnected = connect(mapStateToProps)(Homepage);

export default HomepageConnected;
