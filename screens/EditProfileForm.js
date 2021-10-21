import React from "react";
import { View, TextInput, Text } from "react-native";
import { styles } from "../styles";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/FlatButton";

const profileSchema = yup.object({
    first_name: yup.string(),
    last_name: yup.string(),
    bio: yup.string(),
});

export default function EditProfileForm({ handleEditProfile, first_name, last_name, bio }) {
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    first_name: first_name,
                    last_name: last_name,
                    bio: bio,
                }}
                validationSchema={profileSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    handleEditProfile(values);
                }}
            >
                {(formikprops) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="First name"
                            onChangeText={formikprops.handleChange("first_name")}
                            value={formikprops.values.first_name}
                            onBlur={formikprops.handleBlur('first_name')}
                        />
                        <Text style={styles.errorText}>
                            {formikprops.touched.first_name &&
                                formikprops.errors.first_name}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Last name"
                            onChangeText={formikprops.handleChange("last_name")}
                            value={formikprops.values.last_name}
                            onBlur={formikprops.handleBlur('last_name')}
                        />
                        <Text style={styles.errorText}>
                            {formikprops.touched.last_name &&
                                formikprops.errors.last_name}
                        </Text>

                        <TextInput
                            multiline
                            style={styles.input}
                            placeholder="Bio"
                            onChangeText={formikprops.handleChange("bio")}
                            value={formikprops.values.bio}
                            onBlur={formikprops.handleBlur('bio')}
                        />
                        <Text style={styles.errorText}>
                            {formikprops.touched.bio &&
                                formikprops.errors.bio}
                        </Text>

                        <FlatButton
                            text='submit'
                            onPress={formikprops.handleSubmit}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
}
