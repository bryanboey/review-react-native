import React from 'react'
import { View, Text, Button } from 'react-native'
import { styles } from '../styles'
import { logOut } from '../store/actions/authActions'
import { connect } from 'react-redux'


function Home({ auth, logOut }) {
    const { refreshToken } = auth

    const handleLogOut = () => {
        logOut(refreshToken);
    };
    
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title='log out' onPress={handleLogOut}/>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: (token) => dispatch(
            logOut(token)
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);