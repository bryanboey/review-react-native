import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function authHeader() {
    try {
        const tokens = await AsyncStorage.getItem('tokens')
        const { access } = JSON.parse(tokens)

        return {
            "Authorization": `Bearer ${access}`,
            "Content-Type": "application/json",
        }
    } catch (e) {
        console.log('could not retrieve token')
        return {};
    }
}