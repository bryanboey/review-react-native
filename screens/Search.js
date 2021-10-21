import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import { connect } from 'react-redux';
import PlaceCard from '../shared/PlaceCard';
import AddNewPlace from '../components/AddNewPlace';

function Search({ auth, navigation }) {
    const [loading, setLoading] = useState('');
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState();
    const [pageNumber, setPageNumber] = useState(1)
    const { accessToken } = auth

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

    useEffect(() => {
        searchPlaces()
    }, [input])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Enter a name or an address location"
                value={input}
                onChangeText={setInput}
            />
            {searchResults &&
                <FlatList 
                    data={searchResults.results}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Place Details', {
                                item: item,
                                token: accessToken,
                                }
                            )}
                        >
                            <PlaceCard>
                                <Text style={styles.titleText}>
                                    {item.name}
                                </Text>
                                <Text style={styles.bodyText}>
                                    {item.address}
                                </Text>
                            </PlaceCard>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={AddNewPlace}
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