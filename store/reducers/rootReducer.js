import { combineReducers } from "redux";
import authReducer from "./authReducer";
import placesReducer from "./placesReducer";
import reviewsReducer from "./reviewsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    reviews: reviewsReducer,
    places: placesReducer,
});

export default rootReducer;   