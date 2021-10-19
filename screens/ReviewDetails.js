import React from 'react'
import { View, Text, Button } from 'react-native'
import { styles } from '../styles'
import ReviewCard from '../shared/ReviewCard'

export default function ReviewDetails({ navigation, route }) {
    const { user, establishment, title, body } = route.params;
    return (
        <View style={styles.container}>
            <ReviewCard>
                <Text>{establishment.name}</Text>
                <Text>{establishment.address}</Text>
                <Text>{title}</Text>
                <Text>{body}</Text>
                <Text>Reviewed by: {user}</Text>
            </ReviewCard>
            
        </View>
    )
}