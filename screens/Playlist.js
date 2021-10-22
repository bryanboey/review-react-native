import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import PlaylistCard from "../shared/PlaylistCard";
import { getUserPlaylists } from "../store/actions/playlistActions";
import { styles } from "../styles";

function Playlist({ playlists, getUserPlaylists, navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const { userPlaylists } = playlists;

    useEffect(() => {
        getUserPlaylists();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.playlistContainer}>
                {userPlaylists && (
                    <FlatList
                        refreshing={refreshing}
                        setRefreshing={() => {
                            setRefreshing(true);
                            getUserPlaylists().then(() => {
                                setRefreshing(false);
                            });
                        }}
                        data={userPlaylists}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate(
                                        "Playlist Details",
                                        item
                                    )
                                }
                            >
                                <PlaylistCard>
                                    <View>
                                        <Text style={styles.titleText}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </PlaylistCard>
                            </TouchableOpacity>
                        )}
                    />
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
        getUserPlaylists: () => dispatch(getUserPlaylists()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
