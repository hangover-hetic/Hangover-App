import React       from 'react'
import { Text }    from 'react-native-web'
import { connect } from 'react-redux'

class Homepage extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.userToken)
    }

    render() {
        return (
            <Text>Je suis la page d'index</Text>
        )
    }
}
const mapStateToProps = (state) => ({
    userToken : state
})

const HomepageConnected = connect (
    mapStateToProps
)(Homepage);

export default HomepageConnected;

