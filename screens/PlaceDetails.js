import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useIsFocused } from '@react-navigation/native'
import { styles } from "../styles";
import ReviewCard from "../shared/ReviewCard";
import FlatButton from "../shared/FlatButton";
import moment from "moment";
import { addReview } from "../store/actions/reviewsActions";
import { getPlaceDetails } from "../store/actions/placesActions";
import { connect } from "react-redux";
import PlaceDetailsHeader from "../components/PlaceDetailsHeader";

function PlaceDetails({
    getPlaceDetails,
    places,
    navigation,
    route,
}) {

    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused()

    const { id } = route.params;

    useEffect(() => {
        getPlaceDetails(id)
        console.log('refreshing place details')
    }, [isFocused]);

    const { data, error } = places;

    return (
        <View style={styles.container}>
            {error && <Text>Something went wrong..</Text>}
            {data && (
                <>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <PlaceDetailsHeader data={data} />
                                <FlatButton
                                    text="Add a Review"
                                    onPress={() => navigation.navigate('AddReviewModal', id)}
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
