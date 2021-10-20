import React from "react";
import { View, TextInput, Text } from "react-native";
import { styles } from "../styles";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/FlatButton";
import { Picker } from "@react-native-picker/picker";

const reviewSchema = yup.object({
    title: yup.string().required().min(4),
    body: yup.string().required().min(8),
    star_rating: yup.string().required()
});

export default function ReviewForm({ addReview }) {
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    title: "",
                    body: "",
                    star_rating: "",
                }}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReview(values);
                }}
            >
                {(formikprops) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Review title"
                            onChangeText={formikprops.handleChange("title")}
                            value={formikprops.values.title}
                            onBlur={formikprops.handleBlur('title')}
                        />
                        <Text style={styles.errorText}>
                            {formikprops.touched.title &&
                                formikprops.errors.title}
                        </Text>

                        <TextInput
                            multiline minHeight={75}
                            style={styles.input}
                            placeholder="Review body"
                            onChangeText={formikprops.handleChange("body")}
                            value={formikprops.values.body}
                            onBlur={formikprops.handleBlur('body')}
                        />
                        <Text style={styles.errorText}>
                            {formikprops.touched.body &&
                                formikprops.errors.body}
                        </Text>

                        <Picker
                            selectedValue={formikprops.values.star_rating}
                            onValueChange={(value, index) => 
                                formikprops.setFieldValue('star_rating', value)
                            }
                            mode='dropdown'
                            style={styles.picker}
                        >  
                            <Picker.Item label="★" value="1" />
                            <Picker.Item label="★★" value="1" />
                            <Picker.Item label="★★★" value="1" />
                            <Picker.Item label="★★★★" value="1" />
                            <Picker.Item label="★★★★★" value="1" />
                        </Picker>
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
