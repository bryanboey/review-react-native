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
            }}
        >
            <Stack.Screen
                name="Reviews"
                component={Reviews}
                options={{
                    title: "Reviews",
                    headerTitleStyle: {
                        fontWeight: "bold",
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