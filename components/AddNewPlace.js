import React, { useState } from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import FlatButton from '../shared/FlatButton'
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from '../styles'
import AddNewPlaceForm from './AddNewPlaceForm'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AddNewPlace() {
    const [modalOpen, setModalOpen] = useState(false);

    const successAlert = (data) => {
        Alert.alert(
            "Added successfully",
            `${data.name}\n${data.address}`,
            [
                {
                    text: "OK",
                    style: "OK"
                },
            ],
            {
                cancelable: true,
            }
        )
    }

    const addEstablishment = async (entry) => {
        try {
            const tokens = await AsyncStorage.getItem('tokens')
            const { access } = JSON.parse(tokens)
            const res = await fetch(`http://192.168.18.19:8000/api/establishments/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(entry),
            });
            const data = await res.json();
            console.log(data)
            if (res.status === 500) {
                console.log('500')
            }
            successAlert(data)
            setModalOpen(false)
        } catch (e) {
            console.log(e)
        }
    };
    
    return (
        <View>
            <Text>No results found..</Text>
            <Modal
                visible={modalOpen}
                animationType='slide'
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons
                            name='close'
                            size={24}
                            style={{ ...styles.modalToggle, ...styles.modalClose }}
                            onPress={() => setModalOpen(false)}
                        />
                        <AddNewPlaceForm addEstablishment={addEstablishment} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <FlatButton text='Add a new Place?' onPress={() => setModalOpen(true)} />
        </View>
    )
}
