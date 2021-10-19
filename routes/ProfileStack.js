import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Reviews from "../screens/Reviews";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

export default function ProfileStack() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: "Profile",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                    headerTitleAlign: "left",
                    headerRight: () => (
                        <Button 
                            onPress={() => alert('This is a button!')} 
                            title="Logout"
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
}