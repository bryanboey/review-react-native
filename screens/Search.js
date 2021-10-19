import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import { connect } from 'react-redux';
import PlaceCard from '../shared/PlaceCard';

function Search({ auth, navigation }) {
    const [loading, setLoading] = useState('');
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const { accessToken } = auth

    useEffect(() => {
        const searchPlaces = async () => {
            try {
                const res = await fetch(`http://192.168.18.19:8000/api/establishments/?search=${input}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Authorization": 'Bearer ' + accessToken,
                        "Content-Type": "application/json",
                    },
                });
    
                const data = await res.json();
    
                if (res.status === 400) {
                    
                    throw Error(data.errors);
                }
                setSearchResults(data)
                setLoading(false)
            }
            catch (err) {
                console.log(err)
            }
        }
        searchPlaces()
    }, [input])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Enter a name or address location"
                value={input}
                onChangeText={setInput}
            />
            {searchResults &&
                <FlatList
                    data={searchResults.results}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Place Details', item)}
                        >
                            <PlaceCard>
                                <Text style={styles.titleText}>
                                    {item.name}
                                </Text>
                                <Text>
                                    {item.address}
                                </Text>
                            </PlaceCard>
                        </TouchableOpacity>
                    )}
                />
            }
        </View>
        
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Search);