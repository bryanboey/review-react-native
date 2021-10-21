import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../styles";

export default function PlaceDetailsHeader({ data }) {
    return (
        <View style={styles.reviewDetails}>
            <Text style={styles.reviewDetailsNameText}>{data.name}</Text>
            <Text style={styles.placeDetailsAddress}>{data.address}</Text>
            {data.avg_star_rating ? (
                <View style={styles.placeDetailsReviewRating}>
                    <Text>{data.avg_star_rating.toFixed(2)} </Text>
                    <Image
                        style={styles.icons}
                        source={require("../assets/icons8-star-filled-48.png")}
                    />
                    <Text>{` (${data.review_count} Reviews)`}</Text>
                </View>
            ) : (
                <Text>No rating or reviews yet.</Text>
            )}
        </View>
    );
}
