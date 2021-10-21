import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../styles';
import * as yup from 'yup';
import { Formik } from 'formik';
import { connect } from 'react-redux'
import { logIn } from '../store/actions/authActions'
import FlatButton from '../shared/FlatButton';

const loginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
})

function Login({ logIn, navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.logInContainer}>
                <Text 
                    style={{ 
                        alignSelf: 'center', 
                        marginBottom: 48, 
                        fontSize: 48, 
                        fontWeight: '700'
                    }}
                >
                    foodview.
                </Text>
                <Text style={{ paddingLeft: 10, fontSize: 24, fontWeight: '700' }}>Login</Text>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => {
                        logIn(values);
                    }}
                >
                    {(formikProps) => (
                        <View style={styles.logInForm}>
                            <TextInput
                                style={styles.input}
                                placeholder="username"
                                onChangeText={formikProps.handleChange("username")}
                                value={formikProps.values.username}
                                onBlur={formikProps.handleBlur("username")}
                            />
                            <Text>
                                {formikProps.touched.username && formikProps.errors.username}
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="password"
                                secureTextEntry={true}
                                onChangeText={formikProps.handleChange("password")}
                                value={formikProps.values.password}
                                onBlur={formikProps.handleBlur("password")}
                            />
                            <FlatButton
                                text='log in'
                                onPress={formikProps.handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text
                        style={{ alignSelf: 'center' }}
                    >
                        Don't have an account? Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (creds) => dispatch(logIn(creds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);