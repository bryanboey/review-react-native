import React from "react";
import { View, TextInput, Text } from "react-native";
import { styles } from "../styles";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/FlatButton";
import { connect } from "react-redux";
import { createNewPlaylist } from "../store/actions/playlistActions";

const playlistSchema = yup.object({
    name: yup.string().min(4).required(),
});

function CreatePlaylistModal({ navigation, createNewPlaylist }) {

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    name: "",
                }}
                validationSchema={playlistSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    createNewPlaylist(values);
                    navigation.goBack()
                }}
            >
                {(formikprops) => (
                    <View>
                        <TextInput
                            style={styles.playlistInput}
                            placeholder="Enter a playlist name"
                            onChangeText={formikprops.handleChange("name")}
                            value={formikprops.values.name}
                            onBlur={formikprops.handleBlur('name')}
                        />
                        <Text style={styles.errorText}>
                            {formikprops.touched.name &&
                                formikprops.errors.name}
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

const mapDispatchToProps = (dispatch) => {
    return {
        createNewPlaylist: (playlist) => dispatch(createNewPlaylist(playlist)),
    }
}


export default connect(null, mapDispatchToProps)(CreatePlaylistModal)