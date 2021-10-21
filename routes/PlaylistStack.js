import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Playlist from "../screens/Playlist";
import { styles } from '../styles'
import { MaterialIcons } from '@expo/vector-icons';
import CreatePlaylistModal from "../screens/CreatePlaylistModal";
import PlaylistDetails from "../screens/PlaylistDetails";
import PlaceDetails from "../screens/PlaceDetails";
import ReviewDetails from "../screens/ReviewDetails";
import AddPlaceToPlaylistModal from '../screens/AddPlaceToPlaylistModal'

const Stack = createStackNavigator();

export default function PlaylistStack({ navigation }) {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#FFC529'
                }
            }}
        >
            <Stack.Group>
                <Stack.Screen
                    name="Playlist"
                    component={Playlist}
                    options={{
                        title: "Playlists",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerTitleAlign: "left",
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('PlaylistModal')}
                            >
                                <MaterialIcons 
                                    style={{ paddingRight: 15, }}
                                    name="playlist-add" 
                                    size={30} 
                                    color="black" 
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
                <Stack.Screen 
                    name="Playlist Details" 
                    component={PlaylistDetails}
                    options={{
                        title: "Playlist Details",
                    }}
                />
                <Stack.Screen
                    name="Place Details"
                    component={PlaceDetails}
                    options={{
                        title: "Place Details",
                    }}
                />
                <Stack.Screen
                    name="Review Details"
                    component={ReviewDetails}
                    options={{
                        title: "Review Details",
                    }}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen 
                    name="PlaylistModal" 
                    component={CreatePlaylistModal}
                    options={{
                        title: "Add new Playlist"
                    }}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen 
                    name="AddToPlaylistModal" 
                    component={AddPlaceToPlaylistModal}
                    options={{
                        title: "Add a Place to Playlist"
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}