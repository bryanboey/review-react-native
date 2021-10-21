import AsyncStorage from "@react-native-async-storage/async-storage";

// create playlist
export const createNewPlaylist = (playlist) => {
    return async (dispatch, getStates) => {
        try {
            console.log("entered playlist action create");
            dispatch({ type: "CREATE_PLAYLIST" });
            const tokens = await AsyncStorage.getItem("tokens");
            const { access } = JSON.parse(tokens);

            const res = await fetch(
                `http://192.168.18.19:8000/api/playlists/`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(playlist),
                }
            );
            const data = await res.json();
            console.log(data);
            if (res.status === 500) {
                console.log("500");
            }

            dispatch({ type: "CREATE_PLAYLIST_SUCCESS", payload: data });
        } catch (e) {
            console.log(e);
            dispatch({ type: "CREATE_PLAYLIST_FAILED", payload: e.message });
        }
    };
};

// get all user playlists
export const getUserPlaylists = () => {
    return async (dispatch, getState) => {
        console.log("dispatching fetch all playlists");
        dispatch({ type: "FETCH_USER_PLAYLISTS" });
        try {
            const tokens = await AsyncStorage.getItem("tokens");
            const { access } = JSON.parse(tokens);
            const res = await fetch(
                `http://192.168.18.19:8000/api/playlists/`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();

            if (res.status === 400) {
                throw Error(data.errors);
            }
            
            dispatch({ type: "FETCH_USER_PLAYLISTS_SUCCESS", payload: data });
        } catch (e) {
            console.log(e);
            dispatch({
                type: "FETCH_USER_PLAYLISTS_FAILED",
                payload: e.message,
            });
        }
    };
};

// get playlist details
export const getPlaylistDetails = (id) => {
    return async (dispatch, getState) => {
        console.log("dispatching fetch playlist details");
        dispatch({ type: "GET_PLAYLIST_DETAILS" });
        try {
            const tokens = await AsyncStorage.getItem("tokens");
            const { access } = JSON.parse(tokens);

            const res = await fetch(
                `http://192.168.18.19:8000/api/playlists/${id}/`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${access}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();

            if (res.status === 400) {
                throw Error(data.errors);
            }
            
            console.log('playlist details', data)
            dispatch({ type: "GET_PLAYLIST_DETAILS_SUCCESS", payload: data });
        } catch (e) {
            console.log(e);
            dispatch({
                type: "GET_PLAYLIST_DETAILS_FAILED",
                payload: e.message,
            });
        }
    };
};
