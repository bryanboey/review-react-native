import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReviewDetails from "../screens/ReviewDetails";
import Search from "../screens/Search";
import PlaceDetails from "../screens/PlaceDetails";

const Stack = createStackNavigator();

export default function SearchStack() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    title: "Search",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="Place Details"
                component={PlaceDetails}
                options={{
                    title: "Place Details",
                }}
            />
        </Stack.Navigator>
    );
}