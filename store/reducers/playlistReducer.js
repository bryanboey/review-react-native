const initState = {
    userPlaylists: null,
    loading: false,
    data: null,
    error: null,
};

const playlistReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_PLAYLIST":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "CREATE_PLAYLIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };

        case "CREATE_PLAYLIST_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "FETCH_USER_PLAYLISTS":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "FETCH_USER_PLAYLISTS_SUCCESS":
            return {
                ...state,
                loading: false,
                userPlaylists: action.payload,
                error: null,
            };

        case "FETCH_USER_PLAYLISTS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_PLAYLIST_DETAILS":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "GET_PLAYLIST_DETAILS_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };

        case "GET_PLAYLIST_DETAILS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default playlistReducer;
