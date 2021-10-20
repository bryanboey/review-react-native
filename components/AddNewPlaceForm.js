import React from "react";
import { View, TextInput, Text } from "react-native";
import { styles } from "../styles";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/FlatButton";

const establishmentSchema = yup.object({
    name: yup.string().required(),
    address: yup.string().required()
});

export default function AddNewPlaceForm({ addEstablishment }) {
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    name: "",
                    address: "",
                }}
                validationSchema={establishmentSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addEstablishment(values);
                }}
            >
                {(formikprops) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Establishment's name"
                            onChangeText={formikprops.handleChange("name")}
                            value={formikprops.values.name}
                            onBlur={formikprops.handleBlur('name')}
                        />
                        <Text style={styles.errorText}>
                            {formikprops.touched.name &&
                                formikprops.errors.name}
                        </Text>

                        <TextInput
                            multiline minHeight={75}
                            style={styles.input}
                            placeholder="Establishment's address"
                            onChangeText={formikprops.handleChange("address")}
                            value={formikprops.values.address}
                            onBlur={formikprops.handleBlur('address')}
                        />
                        <Text style={styles.errorText}>
                            {formikprops.touched.address &&
                                formikprops.errors.address}
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
