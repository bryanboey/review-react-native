import React from 'react'
import { View, Text, Button } from 'react-native'
import { styles } from '../styles'

export default function PlaceDetails({ navigation, route }) {
    const { 
        name, address, avg_star_rating, total_star_votes,
        avg_price_rating, total_price_votes, review_count
    } = route.params;

    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>{address}</Text>
            <Text>{avg_star_rating} Stars | {total_star_votes} Voted</Text>
            <Text>{avg_price_rating} Stars | {total_price_votes} Voted</Text>
            <Text>{review_count} Reviews</Text> 
        </View>
    )
}