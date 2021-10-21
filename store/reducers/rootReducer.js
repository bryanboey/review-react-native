import { combineReducers } from "redux";
import authReducer from "./authReducer";
import placesReducer from "./placesReducer";
import playlistReducer from "./playlistReducer";
import reviewsReducer from "./reviewsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    reviews: reviewsReducer,
    places: placesReducer,
    playlists: playlistReducer,
});

export default rootReducer;   