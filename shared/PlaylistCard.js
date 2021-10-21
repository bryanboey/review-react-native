import React from 'react'
import { View } from 'react-native'
import { styles } from '../styles'

export default function PlaylistCard(props) {
    return (
        <View style={styles.playlistCard}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}