import React, { useState } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    Modal, 
    TouchableWithoutFeedback, 
    Keyboard 
} from "react-native";
import { connect } from "react-redux";
import { getCurrentUser, updateProfile } from '../store/actions/authActions'
import { styles } from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewCard from "../shared/ReviewCard";
import ProfileHeader from "../components/ProfileHeader";
import FlatButton from "../shared/FlatButton";
import moment from "moment";
import EditProfileForm from "./EditProfileForm";

function Profile({ auth, getCurrentUser, updateProfile, navigation }) {
    const [refreshing, setRefreshing] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const { loggedUser } = auth;

    const handleEditProfile = (updates) => {
        updateProfile(loggedUser.profile.id, updates)
            .then(() => getCurrentUser())
        setModalOpen(false)
    }

    return (
        <View style={styles.container}>
            {loggedUser && (
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
                                <EditProfileForm
                                    handleEditProfile={handleEditProfile}
                                    first_name={loggedUser.profile.first_name}
                                    last_name={loggedUser.profile.last_name}
                                    bio={loggedUser.profile.bio}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <ProfileHeader loggedUser={loggedUser} />
                                <FlatButton 
                                    text='Edit Profile' 
                                    onPress={() => setModalOpen(true)}
                                />
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
        updateProfile: (id, updates) => dispatch(updateProfile(id, updates)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
