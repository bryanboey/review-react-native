const initState = {
    loading: false,
    data: null,
    error: null,
};

const reviewsReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADDING_REVIEW":
            return {
                ...state,
                loading: true,
            };

        case "ADD_REVIEW_SUCCESS":
            return {
                loading: false,
                data: action.payload,
                error: null,
            };

        case "ADD_REVIEW_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "EDITING_REVIEW":
            return {
                ...state,
                loading: true,
            };

        case "EDIT_REVIEW_SUCCESS":
            return {
                loading: false,
                data: action.payload,
                error: null,
            };

        case "EDIT_REVIEW_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_REVIEW_DETAILS":
            return {
                ...state,
                loading: true,
            };

        case "GET_REVIEW_DETAILS_SUCCESS":
            return {
                loading: false,
                data: action.payload,
                error: null,
            };

        case "GET_REVIEW_DETAILS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default reviewsReducer;
