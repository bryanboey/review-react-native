import { StyleSheet } from 'react-native';

const Colors = {
    darkBlue: '#2E364F',
    blue: '#2D5D7C',
    white: '#ffffff',
    offwhite: '#F3F0E2',
    orange: '#EF5939',
}

const { darkBlue, blue, white, offwhite, orange } = Colors;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    searchInput: {
        // padding: 16,
        // marginTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: darkBlue,
        marginBottom: 8,
    },
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: blue,
    },
    titleText: {
        fontSize: 18,
        color: '#333'
    },
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
     },
     cardContent: {
         marginHorizontal: 18,
         marginVertical: 10,
     },
     placeCard: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: white,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: offwhite,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 0,
        marginVertical: 2,
     },
  });