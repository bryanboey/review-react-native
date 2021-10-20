import React from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import { styles } from '../styles'

function Profile({ auth, navigation }) {

    const { loggedUser } = auth
    console.log(loggedUser)

    return (
        <View style={styles.container}>
            <Text>This is Profile Screen</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Profile)
