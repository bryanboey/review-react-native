import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPlaylistDetails } from "../store/actions/playlistActions";
import { styles } from "../styles";
import PlaceCard from "../shared/PlaceCard";
import FlatButton from "../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";

function PlaylistDetails({ playlists, getPlaylistDetails, navigation, route }) {
    const [refreshing, setRefreshing] = useState(false);

    const { id } = route.params;
    const { data } = playlists;

    const isFocused = useIsFocused()

    useEffect(() => {
        getPlaylistDetails(id);
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10,}}>
                {data && (
                    <>
                        <FlatButton
                            text="Add a new Place"
                            onPress={() =>
                                navigation.navigate("AddToPlaylistModal", id)
                            }
                        />
                        <FlatList
                            data={data.establishment}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            "Place Details",
                                            item
                                        )
                                    }
                                >
                                    <PlaceCard>
                                        <Text style={styles.titleText}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.bodyText}>
                                            {item.address}
                                        </Text>
                                    </PlaceCard>
                                </TouchableOpacity>
                            )}
                        />
                    </>
                )}
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        playlists: state.playlists,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPlaylistDetails: (id) => dispatch(getPlaylistDetails(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetails);
