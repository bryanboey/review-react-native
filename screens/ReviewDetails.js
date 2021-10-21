import React, { useState, useEffect } from "react";
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
import { editReview, getReviewDetails } from "../store/actions/reviewsActions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import FlatButton from "../shared/FlatButton";
import EditReviewForm from "./EditReviewForm";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

function ReviewDetails({
    auth,
    reviews,
    editReview,
    getReviewDetails,
    navigation,
    route,
}) {
    const [refreshing, setRefreshing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const { id } = route.params;
    const { loggedUser } = auth;
    const { data } = reviews;

    const handleEditReview = (review) => {
        editReview(id, review);
        setModalOpen(false);
    };

    useEffect(() => {
        getReviewDetails(id);
    }, []);

    const ratingIcons = () => {
        let images = [];
        for (let i = 0; i < data.star_rating; i++) {
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
                        onRefresh={() => {
                            setRefreshing(true);
                            getReviewDetails(id).then(() => {
                                setRefreshing(false);
                            });
                        }}
                    />
                }
            >
                {data && (
                    <>
                        <Modal visible={modalOpen} animationType="slide">
                            <TouchableWithoutFeedback
                                onPress={Keyboard.dismiss}
                            >
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
                                        title={data.title}
                                        body={data.body}
                                        star_rating={data.star_rating}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        <View style={styles.reviewDetails}>
                            <Text style={styles.reviewDetailsNameText}>
                                {data.establishment.name}
                            </Text>
                            <Text style={styles.reviewDetailsAddressText}>
                                <Ionicons
                                    name="location-sharp"
                                    size={16}
                                    color="black"
                                />
                                <Text>{data.establishment.address}</Text>
                            </Text>
                            <Text style={styles.reviewDetailsTitleText}>
                                {data.title}
                            </Text>
                            <View style={styles.icons}>{ratingIcons()}</View>
                            <Text style={styles.reviewDetailsBodyText}>
                                {data.body}
                            </Text>
                            <View style={styles.reviewDetailsUserWrapper}>
                                <Text style={styles.reviewDetailsUser}>
                                    <Ionicons
                                        name="person"
                                        size={14}
                                        color="black"
                                    />
                                    <Text> {data.user}</Text>
                                </Text>
                                <Text style={styles.reviewDetailsUser}>
                                    {moment(data.created).fromNow()}
                                </Text>
                            </View>
                            {data.user === loggedUser.username ? (
                                <FlatButton
                                    text="edit review"
                                    onPress={() => setModalOpen(true)}
                                />
                            ) : null}
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        reviews: state.reviews,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editReview: (id, review) => dispatch(editReview(id, review)),
        getReviewDetails: (id) => dispatch(getReviewDetails(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetails);
