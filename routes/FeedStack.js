import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Reviews from "../screens/Reviews";
import ReviewDetails from "../screens/ReviewDetails";

const Stack = createStackNavigator();

export default function FeedStack() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#FFC529',
                }
            }}
        >
            <Stack.Screen
                name="Reviews"
                component={Reviews}
                options={{
                    title: "Latest Reviews",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        color: "#272d2f",
                    },
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="Review Details"
                component={ReviewDetails}
                options={{
                    title: "Review Details",
                }}
            />
        </Stack.Navigator>
    );
}