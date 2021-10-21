import React from "react";
import { Text, Button, TouchableOpacity, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Reviews from "../screens/Reviews";
import Profile from "../screens/Profile";
import { connect } from 'react-redux';
import { logOut } from "../store/actions/authActions";
import { styles } from "../styles";

const Stack = createStackNavigator();

function ProfileStack({ auth, logOut }) {

    const { loggedUser } = auth

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
                name="Profile"
                component={Profile}
                options={{
                    title: `${loggedUser.username}`,
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 24,
                    },
                    headerTitleAlign: "left",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => Alert.alert(
                                "Logout",
                                "Are you sure?",
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel",
                                    },
                                    {
                                        text: "Logout",
                                        onPress: () => logOut()
                                    }
                                ],
                                {
                                    cancelable: true,
                                }
                            )}
                        >
                            <Text style={styles.headerBtn}>Logout</Text>
                        </TouchableOpacity>
                        
                    )
                }}
            />
        </Stack.Navigator>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: (token) => dispatch(
            logOut(token)
        ),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStack)