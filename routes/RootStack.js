import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { connect } from 'react-redux';
import HomeTab from "./HomeTab";

const Stack = createStackNavigator();

function RootStack(props) {
    const { isLoggedIn } = props.auth

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {isLoggedIn ? (
                    <Stack.Group>
                        <Stack.Screen
                            name="HomeTab"
                            component={HomeTab}
                            options={{
                                title: "Home",
                                headerTitleStyle: {
                                    fontWeight: "bold",
                                },
                                headerTitleAlign: "center",
                            }}
                        />
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ title: "Login" }}
                        />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(RootStack)