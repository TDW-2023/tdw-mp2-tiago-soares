import { combineReducers } from 'redux';
import animeReducer from './animeReducer';

const rootReducer = combineReducers({
    anime: animeReducer,
    // Add other reducers if needed
});

export default rootReducer;
