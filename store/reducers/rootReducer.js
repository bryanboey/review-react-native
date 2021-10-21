import { combineReducers } from "redux";
import authReducer from "./authReducer";
import reviewsReducer from "./reviewsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    reviews: reviewsReducer,
});

export default rootReducer;