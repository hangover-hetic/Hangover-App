import React       from 'react'
import { 
    Text 
}    from 'react-native'
import { connect } from 'react-redux'

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
    userToken : state.user.userToken
})

const HomepageConnected = connect (
    mapStateToProps
)(Homepage);

export default HomepageConnected;
