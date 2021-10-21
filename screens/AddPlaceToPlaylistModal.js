import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlatButton from "../shared/FlatButton";
import { styles } from "../styles";

export default function AddPlaceToPlaylistModal({ navigation, route }) {
    const [serverData, setServerData] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [input, setInput] = useState("");

    const searchPlaces = async () => {
        try {
            const tokens = await AsyncStorage.getItem("tokens");
            const { access } = JSON.parse(tokens);
            const res = await fetch(
                `http://192.168.18.19:8000/api/establishments/?search=${input}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();

            if (res.status === 400) {
                throw Error(data.errors);
            }
            setServerData(data.results);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        searchPlaces();
    }, [input]);

    const addToPlaylist = async () => {
        const addObj = {
            establishment_id: selectedPlace.id,
            playlist_id: route.params
        }
        try {
            const tokens = await AsyncStorage.getItem("tokens");
            const { access } = JSON.parse(tokens);

            const res = await fetch(
                `http://192.168.18.19:8000/api/playlists/add/`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(addObj),
                }
            );

            const data = await res.json();

            if (res.status === 400) {
                throw Error(data.errors);
            }

            navigation.goBack()
        } catch (err) {
            console.log(err);
        }
    }

    return (
            <View style={styles.addToPlaylist}>
                {serverData && (
                    <>
                        <FlatButton 
                            text='add'
                            onPress={() => addToPlaylist()}
                        />
                        <SearchableDropdown
                            onTextChange={(text) => setInput(text)}
                            selectedPlace={selectedPlace}
                            onItemSelect={(item) => {
                                console.log(item);
                                setSelectedPlace(item);
                            }}
                            items={serverData}
                            placeholder={`${
                                selectedPlace
                                    ? selectedPlace.name
                                    : "select a place to add"
                            }`}
                            resetValue={false}
                            defaultIndex={1}
                            textInputStyle={{
                                //inserted text style
                                marginHorizontal: 15,
                                backgroundColor: "#FAF7F6",
                                borderWidth: 1,
                                borderColor: "#ddd",
                                padding: 10,
                                fontSize: 18,
                                borderRadius: 6,
                            }}
                            itemStyle={{
                                //single dropdown item style
                                marginHorizontal: 15,
                                padding: 10,
                                marginVertical: 0,
                                backgroundColor: "#FAF9F8",
                                borderColor: "#ddd",
                                borderWidth: 1,
                            }}
                            itemTextStyle={{
                                //text style of a single dropdown item
                                color: "#222",
                            }}
                            itemsContainerStyle={{
                                //items container style you can pass maxHeight
                                //to restrict the items dropdown hieght
                                maxHeight: "75%",
                            }}
                        />
                    </>
                )}
            </View>
    );
}
