import authHeader from "../services/authHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

// add review
export const addReview = (review) => {
    return async (dispatch, getState) => {
        dispatch({ type: "ADDING_REVIEW" })
        try {
            const tokens = await AsyncStorage.getItem('tokens')
            const { access } = JSON.parse(tokens)
            const res = await fetch(`http://192.168.18.19:8000/api/reviews/`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(review),
                });
                
                const data = await res.json();
                
                if (res.status === 400) {
                    throw Error(data.errors);
                }
                
                dispatch({ type: "ADD_REVIEW_SUCCESS", payload: data })
        } catch (e) {
            console.log(e)
            dispatch({ type: "ADD_REVIEW_FAILED", payload: e.message })
        }
    }
}

// edit review
export const editReview = (id, review) => {
    return async (dispatch, getState) => {
        console.log('start action')
        dispatch({ type: "EDITING_REVIEW" })
        try {
            const tokens = await AsyncStorage.getItem('tokens')
            const { access } = JSON.parse(tokens)
            const res = await fetch(`http://192.168.18.19:8000/api/reviews/${id}/`, {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(review),
                });
                
                const data = await res.json();
                
                if (res.status === 400) {
                    console.log(data)
                    throw Error(data.errors);
                }
                
                dispatch({ type: "EDIT_REVIEW_SUCCESS", payload: data })
        } catch (e) {
            console.log(e)
            dispatch({ type: "EDIT_REVIEW_FAILED", payload: e.message })
        }
    }
}