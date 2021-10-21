import AsyncStorage from "@react-native-async-storage/async-storage";


// fetch place details
export const getPlaceDetails = (id) => {
    return async (dispatch, getState) => {
        console.log("dispatching fetch place details");
        dispatch({ type: "FETCH_PLACE_DETAILS" });
        try {
            const tokens = await AsyncStorage.getItem("tokens");
            const { access } = JSON.parse(tokens);
            const res = await fetch(
                `http://192.168.18.19:8000/api/establishments/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();

            if (res.status === 400) {
                throw Error(data.errors);
            }
            console.log('here in action')
            dispatch({ type: "FETCH_PLACE_DETAILS_SUCCESS", payload: data });
        } catch (e) {
            console.log(e);
            dispatch({
                type: "FETCH_PLACE_DETAILS_FAILED",
                payload: e.message,
            });
        }
    };
};
