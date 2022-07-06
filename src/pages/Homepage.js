import React       from 'react'
import { 
    Text 
}    from 'react-native'
import { connect } from 'react-redux'
import Navbar      from '../components/Navbar'
import { NavigationContainer } from '@react-navigation/native';

class Homepage extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidUpdate() {
        if (this.props.userToken === "") {
            return;
        }
    }

    render() {
        return <>
            <Text>Je suis la page d'index de jessy</Text>
        </>
    }
}

const mapStateToProps = (state) => ({
    userToken : state.userReducer.userToken
})

const HomepageConnected = connect (
    mapStateToProps
)(Homepage);

export default HomepageConnected;
