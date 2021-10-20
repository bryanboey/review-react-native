import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Playlist from "../screens/Playlist";
import { styles } from '../styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function PlaylistStack() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#FFC529'
                }
            }}
        >
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
                            onPress={() => Alert.alert(
                                "Add New Playlist",
                                "Are you sure?",
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel",
                                    },
                                ],
                                {
                                    cancelable: true,
                                }
                            )}
                        >
                            <MaterialCommunityIcons 
                                style={{ paddingRight: 15, }}
                                name="playlist-plus" 
                                size={30} 
                                color="black" 
                            />
                        </TouchableOpacity>
                        
                    )
                }}
            />
        </Stack.Navigator>
    );
}