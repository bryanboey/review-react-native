import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../styles";

export default function ProfileHeader({ loggedUser }) {
    return (
        <View style={styles.profileContainer}>
            <Image
                style={styles.profileImage}
                source={{
                    uri: `http://192.168.18.19:8000${loggedUser.profile.image}`,
                }}
            />
            <Text style={styles.profileName}>
                {loggedUser.profile.first_name} {loggedUser.profile.last_name}
            </Text>
            <Text style={styles.profileBio}>{loggedUser.profile.bio}</Text>
        </View>
    );
}
