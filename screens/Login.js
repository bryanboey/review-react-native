import React from 'react'
import { View, Text, TextInput } from 'react-native'
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

function Login({ auth, logIn, navigation }) {

    

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
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