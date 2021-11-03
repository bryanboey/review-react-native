import React from "react";
import {
    View,
    TextInput,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
} from "react-native";
import { styles } from "../styles";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/FlatButton";
import { Picker } from "@react-native-picker/picker";
import { addReview } from "../store/actions/reviewsActions";
import { connect } from "react-redux";

const reviewSchema = yup.object({
    title: yup.string().required().min(4),
    body: yup.string().required().min(8),
    star_rating: yup.string().required(),
});

function ReviewForm({ addReview, navigation, route }) {
    const handleAddReview = (review) => {
        const reviewEntry = {
            establishment_id: route.params,
            title: review.title,
            body: review.body,
            star_rating: parseInt(review.star_rating),
        };
        addReview(reviewEntry).then(() => navigation.goBack());
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Formik
                    initialValues={{
                        title: "",
                        body: "",
                        star_rating: "",
                    }}
                    validationSchema={reviewSchema}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        handleAddReview(values);
                    }}
                >
                    {(formikprops) => (
                        <View>
                            <TextInput
                                style={styles.playlistInput}
                                placeholder="Review title"
                                onChangeText={formikprops.handleChange("title")}
                                value={formikprops.values.title}
                                onBlur={formikprops.handleBlur("title")}
                            />
                            <Text style={styles.errorText}>
                                {formikprops.touched.title &&
                                    formikprops.errors.title}
                            </Text>

                            <TextInput
                                multiline
                                minHeight={75}
                                style={styles.input}
                                placeholder="Review body"
                                onChangeText={formikprops.handleChange("body")}
                                value={formikprops.values.body}
                                onBlur={formikprops.handleBlur("body")}
                            />
                            <Text style={styles.errorText}>
                                {formikprops.touched.body &&
                                    formikprops.errors.body}
                            </Text>

                            <Picker
                                selectedValue={formikprops.values.star_rating}
                                onValueChange={(value, index) =>
                                    formikprops.setFieldValue(
                                        "star_rating",
                                        value
                                    )
                                }
                                mode="dropdown"
                                style={styles.picker}
                            >
                                <Picker.Item label="Rating" value="" />
                                <Picker.Item label="★" value="1" />
                                <Picker.Item label="★★" value="2" />
                                <Picker.Item label="★★★" value="3" />
                                <Picker.Item label="★★★★" value="4" />
                                <Picker.Item label="★★★★★" value="5" />
                            </Picker>
                            <FlatButton
                                text="submit"
                                onPress={formikprops.handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </TouchableOpacity>
        </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addReview: (review) => dispatch(addReview(review)),
    };
};

export default connect(null, mapDispatchToProps)(ReviewForm);
