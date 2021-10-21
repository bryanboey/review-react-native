import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles";
import * as yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import { signUp } from "../store/actions/authActions";
import FlatButton from "../shared/FlatButton";

const loginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().required(),
});

function Register({ signUp, auth, navigation }) {
    const { authError } = auth;

    const warningAlert = () => {
        Alert.alert(
            "Registration error",
            `${authError.username ? authError.username : ""}
            ${authError.email ? authError.email : ""}
            ${authError.password ? authError.password : ""}`,
            [
                {
                    text: "OK",
                    style: "OK",
                },
            ]
        );
    };

    const successAlert = () => {
        Alert.alert("Registration successful", `You may now log in.`, [
            {
                text: "OK",
                onPress: () => navigation.goBack(),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logInContainer}>
                <Text
                    style={{
                        alignSelf: "center",
                        marginBottom: 48,
                        fontSize: 48,
                        fontWeight: "700",
                    }}
                >
                    foodview.
                </Text>
                <Text
                    style={{ 
                        paddingLeft: 10, 
                        fontSize: 24, 
                        fontWeight: "700" 
                    }}
                >
                    Register
                </Text>
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => {
                        signUp(values);
                    }}
                >
                    {(formikProps) => (
                        <View style={styles.logInForm}>
                            <TextInput
                                style={styles.input}
                                placeholder="username"
                                onChangeText={formikProps.handleChange(
                                    "username"
                                )}
                                value={formikProps.values.username}
                                onBlur={formikProps.handleBlur("username")}
                            />
                            <Text>
                                {formikProps.touched.username &&
                                    formikProps.errors.username}
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="email"
                                onChangeText={formikProps.handleChange("email")}
                                value={formikProps.values.email}
                                onBlur={formikProps.handleBlur("email")}
                            />
                            <Text>
                                {formikProps.touched.email &&
                                    formikProps.errors.email}
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="password"
                                secureTextEntry={true}
                                onChangeText={formikProps.handleChange(
                                    "password"
                                )}
                                value={formikProps.values.password}
                                onBlur={formikProps.handleBlur("password")}
                            />

                            <FlatButton
                                text="Register"
                                onPress={formikProps.handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ alignSelf: "center" }}>
                        Already have an account? Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
