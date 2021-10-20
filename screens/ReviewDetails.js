import React from 'react'
import { View, Text, Button } from 'react-native'
import { styles } from '../styles'
import ReviewCard from '../shared/ReviewCard'
import { connect } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment';

function ReviewDetails({ auth, navigation, route }) {
    const { user, establishment, title, body, created } = route.params;
    const { loggedUser } = auth

    if (user === loggedUser) {
        console.log('hellO user!')
    }
    return (
        <View style={styles.container}>
            <View style={styles.reviewDetails}>
                <Text style={styles.reviewDetailsNameText}>{establishment.name}</Text>
                
                <Text style={styles.reviewDetailsAddressText}>
                    <Ionicons name="location-sharp" size={16} color="black" />
                    <Text>{establishment.address}</Text>
                </Text>
                <Text style={styles.reviewDetailsTitleText}>
                    {title}
                </Text>
                <Text style={styles.reviewDetailsBodyText}>
                    {body}
                </Text>
                <View style={styles.reviewDetailsUserWrapper}>
                    <Text style={styles.reviewDetailsUser}>
                        <Ionicons name="person" size={14} color="black" /> 
                        <Text> {user}</Text>
                    </Text>
                    <Text style={styles.reviewDetailsUser}>{moment(created).fromNow()}</Text>
                </View>
                
            </View>
            {user === loggedUser.username ? <Button title='edit review' /> : null}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ReviewDetails);