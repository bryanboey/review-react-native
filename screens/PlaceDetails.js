import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Keyboard,
} from "react-native";
import { styles } from "../styles";
import ReviewCard from "../shared/ReviewCard";
import FlatButton from "../shared/FlatButton";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "./ReviewForm";
import moment from "moment";
import { addReview } from "../store/actions/reviewsActions";
import { getPlaceDetails } from "../store/actions/placesActions";
import { connect } from "react-redux";
import PlaceDetailsHeader from "../components/PlaceDetailsHeader";

function PlaceDetails({
    addReview,
    getPlaceDetails,
    places,
    navigation,
    route,
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const { id } = route.params.item;

    useEffect(() => {
        getPlaceDetails(id)
    }, []);

    const { data, error } = places;

    const handleAddReview = (review) => {
        const reviewEntry = {
            establishment_id: id,
            title: review.title,
            body: review.body,
            star_rating: parseInt(review.star_rating),
        };
        addReview(reviewEntry);
        setModalOpen(false);
        // consider adding success message
    };

    return (
        <View style={styles.container}>
            {error && <Text>Something went wrong..</Text>}
            {data && (
                <>
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
                                <ReviewForm handleAddReview={handleAddReview} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <FlatList
                        ListHeaderComponent={
                            <>
                                <PlaceDetailsHeader data={data} />
                                <FlatButton
                                    text="Add a Review"
                                    onPress={() => setModalOpen(true)}
                                />
                            </>
                        }
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            getPlaceDetails(id)
                                .then(() => setRefreshing(false))
                        }}
                        data={data.reviews}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.push("Review Details", item)}
                            >
                                <ReviewCard>
                                    <View style={styles.userText}>
                                        <Text>{item.user}</Text>
                                        <Text style={styles.fromNowText}>
                                            {moment(item.created).fromNow()}
                                        </Text>
                                    </View>
                                    <Text style={styles.titleText}>
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={styles.bodyText}
                                        numberOfLines={2}
                                    >
                                        {item.body}
                                    </Text>
                                </ReviewCard>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews,
        places: state.places,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addReview: (review) => dispatch(addReview(review)),
        getPlaceDetails: (id) => dispatch(getPlaceDetails(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
