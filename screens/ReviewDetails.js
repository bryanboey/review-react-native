import React, { useState } from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    Modal,
    Image,
    ScrollView,
    RefreshControl,
} from "react-native";
import { styles } from "../styles";
import { connect } from "react-redux";
import { editReview } from "../store/actions/reviewsActions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import FlatButton from "../shared/FlatButton";
import EditReviewForm from "./EditReviewForm";

function ReviewDetails({ auth, editReview, navigation, route }) {
    const [refreshing, setRefreshing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { id, user, establishment, title, body, star_rating, created } =
        route.params;
    const { loggedUser } = auth;

    const handleEditReview = (review) => {
        console.log("handle", review);
        editReview(id, review);
        setModalOpen(false);
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);

    const ratingIcons = () => {
        let images = [];
        for (let i = 0; i < star_rating; i++) {
            let star = [];
            star.push(
                <Image
                    key={i}
                    style={styles.icons}
                    source={require("../assets/icons8-star-filled-48.png")}
                />
            );
            images.push(star);
        }
        return images;
    };

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Modal visible={modalOpen} animationType="slide">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContent}>
                            <MaterialIcons
                                name="close"
                                size={24}
                                style={{
                                    ...styles.modalToggle,
                                    ...styles.modalClose,
                                }}
                                onPress={() => setModalOpen(false)}
                            />
                            <EditReviewForm
                                handleEditReview={handleEditReview}
                                title={title}
                                body={body}
                                star_rating={star_rating}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <View style={styles.reviewDetails}>
                    <Text style={styles.reviewDetailsNameText}>
                        {establishment.name}
                    </Text>
                    <Text style={styles.reviewDetailsAddressText}>
                        <Ionicons
                            name="location-sharp"
                            size={16}
                            color="black"
                        />
                        <Text>{establishment.address}</Text>
                    </Text>
                    <Text style={styles.reviewDetailsTitleText}>{title}</Text>
                    <View style={styles.icons}>{ratingIcons()}</View>
                    <Text style={styles.reviewDetailsBodyText}>{body}</Text>
                    <View style={styles.reviewDetailsUserWrapper}>
                        <Text style={styles.reviewDetailsUser}>
                            <Ionicons name="person" size={14} color="black" />
                            <Text> {user}</Text>
                        </Text>
                        <Text style={styles.reviewDetailsUser}>
                            {moment(created).fromNow()}
                        </Text>
                    </View>
                </View>
                {user === loggedUser.username ? (
                    <FlatButton
                        text="edit review"
                        onPress={() => setModalOpen(true)}
                    />
                ) : null}
            </ScrollView>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        reviews: state.review,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editReview: (id, review) => dispatch(editReview(id, review)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetails);
