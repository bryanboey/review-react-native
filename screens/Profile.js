import React from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import { logOut } from '../store/actions/authActions'
import { styles } from '../styles'

function Profile({ auth, logOut, navigation }) {
    const { refreshToken } = auth

    const handleLogOut = () => {
        logOut(refreshToken);
    };

    return (
        <View style={styles.container}>
            <Text>This is Profile Screen</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
