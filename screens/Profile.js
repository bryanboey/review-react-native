import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import { getCurrentUser } from '../store/actions/authActions'
import { styles } from "../styles";
import ReviewCard from "../shared/ReviewCard";
import ProfileHeader from "../components/ProfileHeader";
import FlatButton from "../shared/FlatButton";
import moment from "moment";

function Profile({ auth, getCurrentUser, navigation }) {
    const [refreshing, setRefreshing] = useState(false)
    const { loggedUser } = auth;

    return (
        <View style={styles.container}>
            {loggedUser && (
                <>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <ProfileHeader loggedUser={loggedUser} />
                                <FlatButton text='Update Profile' />
                            </>
                        }
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            getCurrentUser().then(() => {
                                setRefreshing(false)
                            })
                        }}
                        data={loggedUser.written_reviews}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Review Details", item)}
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
                    >
                    </FlatList>
                </>
            )}
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUser: () => dispatch(getCurrentUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
