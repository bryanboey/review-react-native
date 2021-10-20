import { StyleSheet } from "react-native";

const Colors = {
    darkBlue: "#2E364F",
    blue: "#2D5D7C",
    white: "#ffffff",
    yellow: "#FFC529",
    coral: "#FE724C",
    black: "#272d2f",
};

const { darkBlue, blue, white, offwhite, yellow, coral, black } = Colors;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        // marginTop: 10,
    },
    modalToggle: {
        marginBottom: 15,
        // borderWidth: 1,
        borderColor: "#000",
        padding: 15,
        borderRadius: 10,
        alignSelf: "center",
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
        flexDirection: "column",
        height: 500,
    },
    logInForm: {
        marginTop: 32,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    searchInput: {
        borderBottomWidth: 1,
        borderBottomColor: yellow,
        marginTop: 12,
        marginBottom: 4,
        paddingVertical: 4,
    },
    button: {
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: yellow,
    },
    buttonText: {
        color: black,
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 16,
        textAlign: "center",
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
    },
    userText: {
        fontSize: 12,
        flexDirection: "row",
        // color: blue,
        borderBottomWidth: 1,
        borderColor: "#eee",
        marginBottom: 4,
        paddingBottom: 2,
        justifyContent: "space-between",
    },
    bodyText: {
        fontSize: 14,
        color: "#444",
    },
    fromNowText: {
        fontSize: 12,
        color: "#5b5b5b",
    },
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 10,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
    },
    reviewDetails: {
        marginTop: 12,
    },
    reviewDetailsNameText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#333",
    },
    reviewDetailsAddressText: {
        fontSize: 16,
        color: "#444",
        paddingVertical: 2,
        marginBottom: 48,
    },
    reviewDetailsTitleText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#444",
        paddingVertical: 2,
        marginBottom: 24,
    },
    reviewDetailsBodyText: {
        fontSize: 16,
        color: "#444",
        paddingVertical: 2,
        marginBottom: 48,
    },
    reviewDetailsUserWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    reviewDetailsUser: {
        fontSize: 14,
        color: "#444",
    },
    placeCard: {
        // marginHorizontal: 0,
        // // marginVertical: 2,
    },
    picker: {
        alignSelf: 'center',
        marginVertical: 30,
        width: 150,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
      },
    headerBtn: {
        paddingRight: 15,
        fontWeight: "700",
        fontSize: 16,
    }
});
