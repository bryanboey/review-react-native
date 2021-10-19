import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles'

export default function FlatButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    { text }
                </Text>
            </View>
        </TouchableOpacity>
    )
}