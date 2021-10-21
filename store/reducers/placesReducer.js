const initState = {
    loading: false,
    data: null,
    error: null,
};

const placesReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_PLACE_DETAILS":
            return {
                ...state,
                loading: true,
            };

        case "FETCH_PLACE_DETAILS_SUCCESS":
            return {
                loading: false,
                data: action.payload,
                error: null,
            }

        case "FETCH_PLACE_DETAILS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export default placesReducer;