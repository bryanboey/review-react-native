import React from 'react'
import { View } from 'react-native'
import { styles } from '../styles'

export default function PlaceCard(props) {
    return (
        <View style={styles.placeCard}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}