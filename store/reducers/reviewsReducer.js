const initState = {
    loading: false,
    reviews: null,
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
                reviews: action.payload,
                error: null,
            }

        case "ADD_REVIEW_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case "EDITING_REVIEW":
            return {
                ...state,
                loading: true,
            };

        case "EDIT_REVIEW_SUCCESS":
            return {
                loading: false,
                reviews: action.payload,
                error: null,
            }

        case "EDIT_REVIEW_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
};

export default reviewsReducer;
